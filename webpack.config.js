process.env.NODE_ENV = "";
process.env.BABEL_ENV = "";

const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const cssLoaders = require("./webpackConfig/cssConfig");
const outputConfig = require("./webpackConfig/outputConfig");
const envConsts = require("./webpackConfig/envConsts");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractSass = new MiniCssExtractPlugin({
  filename: "styles_[contenthash].css"
});

module.exports = ({ mode, type } = { mode: "production" }) => {
  process.env.NODE_ENV = mode;
  process.env.BABEL_ENV = mode;
  let obj = {
    mode,
    entry: {
      main: "./src/index.js"
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-proposal-object-rest-spread"
                ]
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|woff2|eot|woff)$/,
          use: [
            {
              loader: "file-loader",
              options: {}
            }
          ]
        },
        cssLoaders(mode)
      ]
    },
    output: outputConfig(type),
    plugins: [
      new webpack.DefinePlugin(envConsts(type)),
      new HtmlWebpackPlugin({
        title: "Media Server Admin",
        template: "./public/index.html",
        favicon: "./public/favicon.ico"
      }),
      new CleanWebpackPlugin({}),
      new CopyWebpackPlugin([]),
      // new HtmlWebpackIncludeAssetsPlugin({}),
      new webpack.ProvidePlugin({})
    ],
    devtool: "#inline-source-map"
  };

  if (mode === "development") {
    obj.devServer = {
      historyApiFallback: true,
      open: true,
      disableHostCheck: true
    };
  } else {
    obj.plugins.push(extractSass);
    obj.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    };
  }

  return obj;
};
