const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')

let cssLoaders = [
  {loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('autoprefixer')({
          'browsers': ['last 2 versions', 'safari >= 7', 'ie >= 9', 'ios >= 6']
        })
      ]
    }
  }
]

module.exports = merge(common, {
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
              enabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'assets/index.html',
      favicon: 'assets/favicon.ico',
      showErrors: false
    }),
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new ManifestPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, ''),
      verbose: true,
      dry: false
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})
