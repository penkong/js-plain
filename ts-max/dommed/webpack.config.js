const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist"
  },
  devtool: "inline-source-map",
  // module tell  to webpack how work with files
  module: {
    // how webpack deals to files
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  // tell webpack to which file extensions it to add to imports
  // that finds
  resolve: {
    extensions: [".ts", ".js"]
  }
};
