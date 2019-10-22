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
        // open: 'Google Chrome',
        // port: 8080,
        publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    },
    // HtmlWebpackPlugin 创建入口 html
    plugins: [new HtmlWebpackPlugin({
        title: path.basename(__dirname)
    })],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'html-loader',
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    // https://babeljs.io/docs/en/babel-preset-env#modules
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "useBuiltIns": "entry",
                                "corejs": 2
                            }
                        ]
                    ]
                }
            }
        }, {
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                },
            }, ], // 倒序处理
            // 被加载模块是 resource
            resource: {
                test: /\.css$/,
                exclude: /node_modules/, // 与 include 同时存在是优先级比 include 高
                include: /src/,
            },
            // 加载着是 issuer - 只有 src/js 下的 .js 文件引用 css 文件，这个条才生效
            issuer: {
                test: /\.js$/,
                exclude: /src\/(?!(js)\/).*/,
            }
        }]
    }
}