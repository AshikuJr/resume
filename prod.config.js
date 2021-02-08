const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
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
                  modules: false
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
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use:  [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
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
  target: ['es5', 'web'],
  performance: {
    hints: false
  },
  cache: true,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        parallel: true,
        extractComments: false,
      }),
    ],
    usedExports: true
  },
  stats: {
    assets: false,
    modules: false,
    warnings: false,
  },
}