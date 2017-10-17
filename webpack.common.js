const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
const dev = process.env.NODE_ENV === 'dev'

let cssLoaders = [
  {loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: !dev
    }
  }
]

if (!dev) {
  cssLoaders.push({
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('autoprefixer')({
          'browsers': ['last 2 versions', 'safari >= 7', 'ie >= 9', 'ios >= 6']
        })
      ]
    }
  })
}

module.exports = {
  entry: {
    app: [
      './assets/css/app.scss',
      './assets/js/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: dev ? '[name].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: dev ? '[name].css' : '[name].css',
      disable: dev
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'assets/index.html',
      favicon: 'assets/favicon.ico',
      showErrors: dev
    }),
    new FlowBabelWebpackPlugin({
      formatter: (errorCode, errorDetails) => {
        return 'A Flow error was detected: ' + errorCode + '\n\n' + errorDetails
      }
    })
  ]
}
