const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
      minify: false
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  exclude: ["transform-async-to-generator", "transform-regenerator"]
                }
              ], 
              '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use:  [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use:  [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader?url=false',
            options: {
              sourceMap: true,
            },
          },
          {
          loader: 'resolve-url-loader',
          options: {
            sourceMap: true,
          }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf)$/i,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  cache: true,
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    watchContentBase: true,
    open: true,
    host: 'localhost',
    port: 8080,
    noInfo: true
  },
}