const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: "./root/src/site.js",
    output: {
        filename: "site.[contentHash].js",
        path: path.resolve(__dirname, "root/jekyll")
    },
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["root/jekyll/*.js", "root/jekyll/*.css", "root/jekyll/*.map"], {}),
        new MiniCssExtractPlugin({
            filename: "site.[contentHash].min.css"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            //hash: true,
            template: "./root/src/layout.tmpl.html",
            filename: path.resolve(__dirname, "root/jekyll/_layouts/layout.html")
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            })
        ]
    }
};