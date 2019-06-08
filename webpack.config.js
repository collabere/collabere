var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

const publicPath = 'http://localhost:3000/';
const publicUrl = 'http://localhost:3000/';
module.exports = {
  context: __dirname,

  entry: './frontend/src/index.js',

output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'frontend/static/frontend'),
        publicPath: './frontend/static/frontend'

    },

  plugins: [
    new BundleTracker({filename: './home/sanskar95/development/collabere/webpack-stats.json'}),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                }
            }]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }

};