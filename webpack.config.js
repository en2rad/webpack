
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const devMode = process.env.NODE_ENV === 'development'


const jsLoaders = () => {
    const loaders = [{
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
    }]

    loaders.push('eslint-loader')

    return loaders
}
module.exports = {
    mode: 'development',
    entry: './source/scripts/main.js',
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        overlay: true,
        open: true,
        hot: devMode      
    },
    devtool: 'source-map',
    resolve: { 
        alias:  {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src/sourse')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins:  [
        new HTMLWebpackPlugin({
            template: './index.html',
        }),
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css'
        }),   
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'source/copyMe.txt'),
                    to: path.resolve(__dirname, "dest/")
                }
            ],
        }),

    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {              
                            hmr: devMode,
                            reloadAll: true,
                        },
                    },
                  'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '.',
                          
                        },
                    },
                  'css-loader',
                  'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    }
}
