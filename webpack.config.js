const path = require('path')

module.exports = {
    entry: './client/app.js', // entry point is in the client folder, called app.js
    mode: 'development',
    output: {
      path: __dirname, // assumes your bundle.js will be in the root of your project folder
      filename: './public/bundle.js'
    },
    // devServer: {
    //   contentBase: path.join(__dirname, 'public')
    // },
    devtool: 'source-maps',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
            }
          },
        {
          test: /\.css$/,
          use: [
          'style-loader',
          'css-loader'
          ]
        }
      ]
    }
  }