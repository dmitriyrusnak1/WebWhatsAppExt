const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const importPlugin = require('postcss-import');
const cssNextPlugin = require('postcss-cssnext');
const calcPlugin = require('postcss-calc');
const nestedPlugin = require('postcss-nested');
const mixinsPlugin = require('postcss-mixins');
const projectStyles = new ExtractTextPlugin('style-[contenthash].css');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');





module.exports = {
  entry: {
    content_script: "./content-scripts/App.jsx",
    background: "./src/background.js",
    popup: "./popup-page/App.jsx",
    option: "./option-page/App.jsx"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      ///////////////////
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: {modules: true} },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              modules: true,
              plugins: [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                }),
              ]
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      },



      ////////////////////
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
         options: {
           modifyVars: {
             'primary-color': '#1DA57A',
           },
           javascriptEnabled: true,
         },
        }],
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: "./popup-page/popup.html", force: true },
        { from: "./option-page/option.html", force: true },
        { from: "./src/app/", force: true }
      ],
      {}
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"' + process.env.NODE_ENV + '"'
      }
    }),

    ////////////
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    ////////////
  ],
  devServer: {
    contentBase: "/dist",
    hot: true
  }
};
