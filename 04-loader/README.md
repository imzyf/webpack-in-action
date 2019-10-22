# 预处理器

## loader

用公式表达 loader 的本质：

```bash
output = loader(input)

eg:
ES5 = babel-loader(ES6+)

style 标签 = style-loader(css-loader(sass-loader(SCSS)))
```

## babel-loader

```bash
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

- babel-loader 使 Babel 与 Webpack 协同工作的模块
- @babel/core Babel 编译器的核心模块
- @babel/preset-env 官方推荐的预置器
