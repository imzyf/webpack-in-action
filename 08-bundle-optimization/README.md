# 打包优化

> 不要过早优化。

## 缩小打包作用域

exclude 和 include 是确定 loader 的规则范围：

```javascript
{
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
}
```

noParse 是不去解析但仍会打包到 bundle 中：

```javascript
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/
  }
};
```

IgnorePlugin 可以完全排除一些模块，被排除的模块即便被引用了也不会被打包进资源文件中：

```javascript
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale$/,
  contextRegExp: /moment$/
});
```
