const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    modal: './example/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './example'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Modal test',
      template: './example/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          },
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../example/dist')
  },
};