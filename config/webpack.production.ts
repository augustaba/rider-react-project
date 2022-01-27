import merge from 'webpack-merge';
import BaseConfig from './webpack.base';

// const smp = new SpeedMeasurePlugin();

// export default smp.wrap(
// 	merge(BaseConfig, {
// 		mode: 'production',
// 		plugins: [],
// 	})
// );

export default merge(BaseConfig, {
  mode: 'production',
  stats: 'errors-only',
  plugins: [],
});
