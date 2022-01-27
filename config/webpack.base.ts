import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import WebpackDevServer from 'webpack-dev-server';
import { resolve } from 'path';
import { isDevelopment, PROJECT_PATH } from './constants';

type MyConfiguration = Configuration & {
  devServer?: WebpackDevServer.Configuration;
};

const getCssLoaders = (importLoaders: number, isModules?: boolean) => [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: isModules
        ? {
            localIdentName: '[local]--[hash:base64:5]',
          }
        : false,
      sourceMap: isDevelopment,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      // 兼容不同浏览器
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            // 加前缀
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
      sourceMap: isDevelopment,
    },
  },
];

const BaseConfig: MyConfiguration = {
  cache: true,
  entry: {
    index: resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    path: resolve(PROJECT_PATH, 'dist'),
    filename: '[name].[hash:8].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules'],
    alias: {
      '@': resolve(PROJECT_PATH, 'src'),
      '@@': resolve(PROJECT_PATH, 'src/pages/.rider'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
    minimize: !isDevelopment,
    // @ts-ignore filter过滤后为数组
    minimizer: [
      !isDevelopment &&
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              pure_funcs: ['console.log'],
            },
          },
        }),
      !isDevelopment && new CssMinimizerPlugin(),
    ].filter(Boolean),
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        exclude: resolve(PROJECT_PATH, 'node_modules'),
        options: { cacheDirectory: true },
      },
      {
        test: /\.css$/,
        exclude: resolve(PROJECT_PATH, 'node_modules'),
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        include: resolve(PROJECT_PATH, 'node_modules/antd/'),
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: resolve(PROJECT_PATH, 'node_modules'),
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              ...getCssLoaders(2, true),
              {
                loader: 'less-loader',
                options: {
                  sourceMap: isDevelopment,
                },
              },
            ],
          },
          {
            use: [
              ...getCssLoaders(2),
              {
                loader: 'less-loader',
                options: {
                  sourceMap: isDevelopment,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
    }),
    new HtmlWebpackPlugin({
      minify: true,
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
    }),
  ],
};

export default BaseConfig;
