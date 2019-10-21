const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: './index.js',
        vendor: ['lodash']
    },
    output: {
        filename: '[name]@[chunkhash].js', // 输出资源的文件名
        path: path.resolve(__dirname, 'dist'), //输出资源的位置，要求必须为绝对路径，wp4 默认为 dist
        // publicPath: '/dist/', // 资源的请求位置 
    },
    mode: 'development',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), // 告诉服务器从哪个目录中提供内容  
        open: 'Google Chrome',
        // port: 8080,
        publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    },
    // HtmlWebpackPlugin 创建入口 html
    plugins: [new HtmlWebpackPlugin({
        title: path.basename(__dirname)
    })]
}