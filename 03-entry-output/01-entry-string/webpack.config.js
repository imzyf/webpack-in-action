const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: '[name]@bundle.js',
    },
    mode: 'development',
    devServer: {
        publicPath: '/',
    },
    // HtmlWebpackPlugin 创建入口 html
    plugins: [new HtmlWebpackPlugin({
        title: path.basename(__dirname)
    })]
}