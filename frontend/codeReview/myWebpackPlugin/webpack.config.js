const path = require('path')
const webpack = require('webpack')
const junhoPlugin = require('./junhoPlugin')

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new junhoPlugin('test'),
  ]
}
