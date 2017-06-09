
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('../package.json');
const banner = pkg.name + ' v' + pkg.version + '\n' + pkg.repository.url;

module.exports = {

  context: __dirname,

  watch: true,

  entry: '../src/main.js',

  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'js/vueditor.min.js',
    library: 'Vueditor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(css|less)$/, loader: ExtractTextPlugin.extract('style-loader', 'css!less!postcss') },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },

  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('style-loader', 'css!postcss'),
      less: ExtractTextPlugin.extract('style-loader', 'css!less!postcss')
    }
  },

  postcss: function () {
    return [autoprefixer({remove: false})];
  },

  plugins: [
    new ExtractTextPlugin('css/vueditor.min.css'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],

  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
    },
    vuex: {
      commonjs: 'vuex',
      commonjs2: 'vuex',
      amd: 'vuex',
      root: 'Vuex',
    }
  }

};