const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    fileName: "main.js",
    path: path.resolve(__dirname, "dist"),
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 4
            })
        ]
    }
}