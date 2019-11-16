const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: './dist'
    },
    resolve: {
        extensions: [".ts",".tsx", '.js', '.jsx', '.css'],
        alias: {
            Common: path.resolve(__dirname, './src/Common'),
            Main: path.resolve(__dirname, './src/Main'),
            Modules: path.resolve(__dirname, './src/Modules')
        }
    },
    entry: {
        introduction: "./src/intro.ts",
        application: "./src/index.tsx",
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tslint: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};