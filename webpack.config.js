const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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

let config = {
  entry: {
    app: [
      './assets/css/app.scss',
      './assets/js/app.js'
    ]
  },
  watch: dev,
  devtool: dev ? 'cheap-module-eval-source-map' : false,
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
      },
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
              enabled: !dev
            }
          }
        ]
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
      favicon: false,
      showErrors: dev
    })
  ]
}

if (!dev) {
  config.plugins.push(new UglifyJSPlugin({
    sourceMap: false
  }))
  config.plugins.push(new ManifestPlugin())
  config.plugins.push(new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, ''),
    verbose: true,
    dry: false
  }))
}

module.exports = config
