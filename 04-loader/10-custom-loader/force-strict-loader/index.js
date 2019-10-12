var loaderUtils = require('loader-utils');

module.exports = function (content) {
    // 判断缓存
    if (this.cacheable) {
        this.cacheable();
    }
    // 获取和打印 options
    var options = loaderUtils.getOptions(this) || {};
    console.log('options', options)

    // 处理 content 
    var useStrictPrefix = "'use strict';\n\n\n\n"
    return useStrictPrefix + content
}