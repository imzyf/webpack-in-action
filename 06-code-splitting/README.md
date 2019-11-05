<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [代码分片](#%E4%BB%A3%E7%A0%81%E5%88%86%E7%89%87)
  - [Webpack 4](#webpack-4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 代码分片

## Webpack 4

分离 app(应用程序) 和 vendor(第三方库) 入口

> 在 webpack < 4 的版本中，通常将 vendor 作为单独的入口起点添加到 entry 选项中，以将其编译为单独的文件（与 CommonsChunkPlugin 结合使用）。而在 webpack 4 中不鼓励这样做。而是使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。不要 为 vendor 或其他不是执行起点创建 entry。
