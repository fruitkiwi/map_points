var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'app/js/app.js'),
  output: {
    path: path.resolve(__dirname, 'app/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'app/js'),
        exclude: path.resolve(__dirname, 'app/bundle.js'),
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}