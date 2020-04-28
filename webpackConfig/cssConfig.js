const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = type => {
  let variable = {
    production: {
      test: /\.(css|scss)$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
    },
    development: {
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }
  };
  return variable[type];
};
