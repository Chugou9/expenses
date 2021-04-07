const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: "development",
    devtool: "source-map",
    // devServer: {
    //   contentBase: './dist',
    //   port: 8081,
    //   host: '0.0.0.0'
    // },
    resolve: {
        extensions: [".ts",".tsx", '.js', '.jsx', '.css', '.less'],
        alias: {
            Common: path.resolve(__dirname, './src/Common'),
            Main: path.resolve(__dirname, './src/Main'),
            Modules: path.resolve(__dirname, './src/Modules'),
            Models: path.resolve(__dirname, './src/Models'),
            Consts: path.resolve(__dirname, './src/Consts'),
            Utils: path.resolve(__dirname, './src/Utils'),
            Enums: path.resolve(__dirname, './src/Enums')
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
                    {
                      loader: 'babel-loader',
                      options: {
                        cacheDirectory: true
                      }
                    },
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
            },
            {
                test: /\.less$/,
                use: [
                  {
                    loader: 'style-loader', // creates style nodes from JS strings
                  },
                  {
                    loader: 'css-loader', // translates CSS into CommonJS
                  },
                  {
                    loader: 'less-loader', // compiles Less to CSS
                  },
                ],
              },
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
              }
        ]
    }
};