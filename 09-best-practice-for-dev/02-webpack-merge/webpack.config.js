const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const SizePlugin = require('size-plugin');

module.exports = merge.smart(commonConfig, {
    mode: 'development',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), // 告诉服务器从哪个目录中提供内容  
        // open: 'Google Chrome',
        // port: 8080,
        publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    },
    plugins: [
        new SizePlugin()
    ]
})