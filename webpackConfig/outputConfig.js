const path = require("path");

module.exports = type => {
  return {
    path: path.resolve(__dirname, "../dist"),
    filename: type === "dev" ? "index.js" : "index_[contenthash].js",
    publicPath: "/"
  };
};
