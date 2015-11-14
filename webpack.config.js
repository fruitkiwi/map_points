var path = require('path')

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
  }
}