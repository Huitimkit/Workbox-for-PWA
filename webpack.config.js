const path = require('path'),
    htmlPlugin = require('html-webpack-plugin'),
    cleanPlugin = require('clean-webpack-plugin'),
    dist = 'dist',
    workboxPlugin = require('workbox-webpack-plugin');


module.exports = {
  entry: {
    index: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, dist)
  },
  plugins: [
    new cleanPlugin([dist]),
    new htmlPlugin({
      filename: 'index.html',
      title: 'Get Started With Workbox For Webpack'
    }),
    new workboxPlugin({
      globDirectory: dist,
      // 配置需要预缓存的文件
      globPatterns: ['**/*.{html,js}'],
      swSrc: './src/sw.js',
      swDest: path.join(dist, 'sw.js')
    })
  ]
};
