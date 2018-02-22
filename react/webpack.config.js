const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
  ExtractTextPluginConfig,
  HtmlWebpackPluginConfig,
  CleanWebpackPluginConfig,
  OpenBrowserPluginConfig,
  HotModuleReplacement,
} = require('./webpack-plugins-config');

const isProd = process.env.NODE_ENV === 'production'; // true or false

const PATH = {
  entry: path.join(__dirname, 'src/js/index.js'),
  output: path.join(__dirname, 'dist'),
};

// Extract css configuration
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/',
});
const cssConfig = isProd ? cssProd : cssDev;

const getPlugins = () => {
  const plugins = isProd ?
    [CleanWebpackPluginConfig, ExtractTextPluginConfig] :
    [OpenBrowserPluginConfig, HotModuleReplacement];

  return [HtmlWebpackPluginConfig, ...plugins];
}

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', PATH.entry, 'webpack-hot-middleware/client'],
  },
  output: {
    filename: '[name].bundle.js',
    path: PATH.output,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['env', { modules: false }], 'react'],
              plugins: ['react-hot-loader/babel', 'transform-class-properties']
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000
  },
  plugins: getPlugins(),
}
