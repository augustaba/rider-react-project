import merge from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import BaseConfig from './webpack.base';
import { SERVER_HOST, SERVER_PORT } from './constants';

const DevelopmentConfig = merge(BaseConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  plugins: [new HotModuleReplacementPlugin()],
  stats: 'errors-only',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
});
export default DevelopmentConfig;
