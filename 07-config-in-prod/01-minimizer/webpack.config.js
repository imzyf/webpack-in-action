const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack'); // to access built-in plugins

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: './index.js',
        // vendor: ['lodash'], webpack 4 已经不推荐使用
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

    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                exclude: /node_modules/,
            }),
        ],
        splitChunks: {
            chunks: 'all'
        },
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),

        // HtmlWebpackPlugin 创建入口 html
        new HtmlWebpackPlugin({
            title: path.basename(__dirname)
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name(file) {
                        if (process.env.NODE_ENV === 'development') {
                            return '[path][name].[ext]';
                        }
                        return '[contenthash].[ext]';
                    },
                },
            }, ],
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
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                }
            ],
        }, {
            // 被加载模块是 resource
            resource: {
                test: /\.css$/,
            },
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        // publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                    },
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ], // 倒序处理 
        }]
    }
}