var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextPlugin('css/[name]-two.css');
const HtmlWebpackPlugin = new require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
              less: extractCSS.extract({
                  use:['css-loader', 'less-loader'],
                  fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
              }),
          }
          // other vue-loader options go here
        }
      },
        {
            test: /\.css$/,
            loader: extractCSS.extract({
                fallback: "style-loader",
                use: ['css-loader']
            })
        },
        {
            test: /\.less$/,
            loader: extractLESS.extract({
                fallback: "style-loader",
                use: ['css-loader', 'less-loader']
            })
        },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
        {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'
            }
        },

    ]
  },
    plugins:[extractCSS,extractLESS, new HtmlWebpackPlugin()],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
