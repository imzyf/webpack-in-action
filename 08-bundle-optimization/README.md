<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [打包优化](#%E6%89%93%E5%8C%85%E4%BC%98%E5%8C%96)
  - [缩小打包作用域](#%E7%BC%A9%E5%B0%8F%E6%89%93%E5%8C%85%E4%BD%9C%E7%94%A8%E5%9F%9F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
