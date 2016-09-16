const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
//const Grommet = `${__dirname}/grommet/scss/grommet-core`
//const Neat = require('node-neat').includePaths.concat('./node_modules/breakpoint-sass/stylesheets/')

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: ['babel-polyfill',PATHS.app]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' +
          (encodeURIComponent(path.resolve('./node_modules')))
       },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap' 
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: [
          PATHS.app,
        path.normalize(__dirname + `/src/js/`),
        path.normalize(__dirname + `/node_modules/joi/`),
        path.normalize(__dirname + `/node_modules/isemail/`),
        path.normalize(__dirname + `/node_modules/topo/`),
        path.normalize(__dirname + `/node_modules/hoek/`),
        path.normalize(__dirname + `/node_modules/react-flex-data/`),

      ]

      },
      {
        test: /\.json$/, loader: 'json' 
      }
    ]
  }
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    node: {
      dns: 'mock',
      net: 'mock'
    },
    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true 
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    node: {
      dns: 'mock',
      net: 'mock'
    },
    plugins: [
      new Webpack.optimize.CommonsChunkPlugin('common.js'),
      new Webpack.optimize.DedupePlugin(),
      new Webpack.optimize.UglifyJsPlugin(),
      new Webpack.optimize.AggressiveMergingPlugin()
    ]
  });
}
