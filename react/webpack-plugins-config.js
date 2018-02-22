const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; // true or false

// Plugins configuration
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'main.css',
  allChunks: true,
  disable: false,
  ignoreOrder: false,
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'Redux Tutorial',
  template: path.join(__dirname, 'src/index.html'),
  filename: 'index.html',
  minify: {
    collapseWhitespace: isProd,
  },
  hash: true,
  cache: true,
  showErrors: !isProd,
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist'], {
  verbose: true,
});
const OpenBrowserPluginConfig = new OpenBrowserPlugin({ url: 'http://localhost:3000 '});
const HotModuleReplacement = new webpack.HotModuleReplacementPlugin();

module.exports = {
  ExtractTextPluginConfig,
  HtmlWebpackPluginConfig,
  CleanWebpackPluginConfig,
  OpenBrowserPluginConfig,
  HotModuleReplacement,
}
