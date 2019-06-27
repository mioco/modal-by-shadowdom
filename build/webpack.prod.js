const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    modal: './src/Modal.js',
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }
      }
    ]
  }
};