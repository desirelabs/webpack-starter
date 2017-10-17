const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')

let cssLoaders = [{
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    minimize: false
  }
}]

module.exports = merge(common, {
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: false,
    hot: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders
        })
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...cssLoaders, 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|jp?g|gif|svg|eot|ttf|otf|wav)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:7].[ext]'
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'assets/index.html',
      favicon: 'assets/favicon.ico',
      showErrors: true
    }),
    new FlowBabelWebpackPlugin({
      formatter: (errorCode, errorDetails) => {
        return 'A Flow error was detected: ' + errorCode + '\n\n' + errorDetails
      }
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    })
  ]
})
