const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "none",
  // module tell  to webpack how work with files
  // apply per file
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
  },
  // apply to general workflow.
  plugins: [new CleanPlugin.CleanWebpackPlugin()]
};
