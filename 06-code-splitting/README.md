# 代码分片

## Webpack 4

分离 app(应用程序) 和 vendor(第三方库) 入口

> 在 webpack < 4 的版本中，通常将 vendor 作为单独的入口起点添加到 entry 选项中，以将其编译为单独的文件（与 CommonsChunkPlugin 结合使用）。而在 webpack 4 中不鼓励这样做。而是使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。不要 为 vendor 或其他不是执行起点创建 entry。
