//
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//
module.exports = {
  // we use polifill to conver promise arr.from and other stuff that
  // does not even exist in es5
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    // need to be absolute path
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    // specify folder which dev server , serve
    contentBase: './dist'
  },
  // allow us for processing complicated work on input
  plugins: [
    // draw out index.html from scr to dist.
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // starter
      template: './src/index.html'
    })
  ],
  // loaders in wp allow us to import and load all different kind of files
  // like sass to css or es6 to es5.
  module: {
    // arr of all loader we want to use.
    rules: [
      // each loader has one object.
      {
        // transpiling
        // do for all ... files
        test: /\.js$/,
        exclude: /node_modules/,
        // and then use this loader ...
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  target: 'node'
};
