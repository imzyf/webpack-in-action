# 模块打包

## CommonJS

每个文件是一个模块。将一个 JavaScript 文件直接通过 script 标签插入页面中与封装成 CommonJS 模块最大的不同在于，前者的顶层作用域是全局作用域，在进行变量及函数声明时会污染全局环境；而后者会形成一个属于模块自身的作用域，所有的变量及函数只有自己能访问，对外是不可见的。

### CommonJS 导出

导出是一个模块向外暴露自身的唯一方式。在 CommonJS 中，通过 module.exports 可以导出模块中的内容。

```js
module.exports = {
  name: "calculater",
  add: function(a, b) {
    return a + b;
  }
};
```

CommonJS 模块内部会有一个 module 对象用于存放当前模块的信息，可以理解成在每个模块的最开始定义了以下对象：

```js
var module = {...};
// 模块自身逻辑
module.exports = {...}
```

也支持另一种简化的导出方式：直接使用 exports，例如：

```js
exports.name = "calculater";
exports.add = function(a, b) {
  return a + b;
};
```

内在机制是将 exports 指向了 module.exports，而 module.exports 在初始化时是一个空对象：

```js
var module = { exports: {} };
var exports = module.exports;
```

在使用 exports 时要注意一个问题，即不要直接给 exports 赋值，否则会导致其失效。

```js
exports = { name: "calculater" };
```

另一个在导出时容易犯的错误是不恰当地把 module.exports 与 exports 混用。下面的例子最后导出的只有 name。

```js
exports.add = function(a, b) {
  return a + b;
};
module.exports = { name: "calculater" };
```

要注意导出语句不代表模块的末尾，在 module.exports 或 exports 后面的代码依旧会照常执行。在实际使用中，为了提高可读性，不建议采取上面的写法，而是应该将 module.exports 及 exports 语句放在模块的末尾。

### CommonJS 导入

```js
// calculator.js
module.exports = {
  add: function(a, b) {
    return a + b;
  }
}; // index.js
const calculator = require("./calculator.js");
const sum = calculator.add(2, 3);
console.log(sum); // 5
```

当我们 require 一个模块时会有两种情况：

- require 的模块是第一次被加载。这时会首先执行该模块，然后导出内容。
- require 的模块曾被加载过。这时该模块的代码不会再次执行，而是直接导出上次执行后得到的结果。

模块会有一个 module 对象用来存放其信息，这个对象中有一个属性 loaded 用于记录该模块是否被加载过。它的值默认为 false，当模块第一次被加载和执行过后会置为 true，后面再次加载时检查到 module.loaded 为 true，则不会再次执行模块代码。

有时我们加载一个模块，不需要获取其导出的内容，只是想要通过执行它而产生某种作用，比如把它的接口挂在全局对象上，此时直接使用 require 即可。

```js
require("./task.js");
```

另外，require 函数可以接收表达式，借助这个特性我们可以动态地指定模块加载路径。

```js
const moduleNames = ["foo.js", "bar.js"];
moduleNames.forEach(name => {
  require("./" + name);
});
```

## ES6 Module

```js
// calculator.js
export default {
  name: "calculator",
  add: function(a, b) {
    return a + b;
  }
};

// index.js
import calculator from "./calculator.js";
const sum = calculator.add(2, 3);
console.log(sum); // 5
```

ES6 Module 也是将每个文件作为一个模块，每个模块拥有自身的作用域，不同的是导入、导出语句。

在 ES6 Module 中不管开头是否有 "use strict"，都会采用严格模式。如果将原本是 CommonJS 的模块或任何未开启严格模式的代码改写为 ES6 Module 要注意这点。

### ES6 导出

export 有两种形式：

- 命名导出
- 默认导出

一个模块可以有多个命名导出。它有两种不同的写法：

```js
// 写法1
export const name = "calculator";
export const add = function(a, b) {
  return a + b;
};

// 写法2
const name = "calculator";
const add = function(a, b) {
  return a + b;
};
export { name, add };
```

在使用命名导出时，可以通过 as 关键字对变量重命名：

```js
const name = "calculator";
const add = function(a, b) {
  return a + b;
};
export { name, add as getSum }; // 在导入时即为 name 和 getSum
```

与命名导出不同，模块的默认导出只能有一个。我们可以将 export default 理解为对外输出了一个名为 default 的变量，因此不需要像命名导出一样进行变量声明，直接导出值即可：

```js
// 导出字符串
export default 'This is calculator.js';

// 导出 class
export default class {...}

// 导出匿名函数
export default function() {...}
```

### ES6 导入

```js
import { name, add } from "./calculator.js";
add(2, 3);
```

加载带有命名导出的模块时，import 后面要跟一对大括号来将导入的变量名包裹起来，并且这些变量名需要与导出的变量名完全一致。导入变量的效果相当于在当前作用域下声明了这些变量（name 和 add），并且不可对其进行更改，也就是所有导入的变量都是只读的。

与命名导出类似，我们可以通过 as 关键字可以对导入的变量重命名。如：

```js
import { name, add as calculateSum } from "./calculator.js";
calculateSum(2, 3);
```

在导入多个变量时，我们还可以采用整体导入的方式：

```js
import * as calculator from "./calculator.js";
console.log(calculator.add(2, 3));
console.log(calculator.name);
```

对于默认导出来说，import 后面直接跟变量名，并且这个名字可以自由指定（比如这里是 myCalculator），它指代了 calculator.js 中默认导出的值。从原理上可以这样去理解：

```js
import myCalculator from "./calculator.js";
calculator.add(2, 3);
```

```js
import { default as myCalculator } from "./calculator.js";
```

混合使用：

```js
import React, { Component } from "react";
```

这里的 React 对应的是该模块的默认导出，而 Component 则是其命名导出中的一个变量。这里的 React 必须写在大括号前面，而不能顺序颠倒，否则会提示语法错误。

### 复合写法

在工程中，有时需要把某一个模块导入之后立即导出，比如专门用来集合所有页面或组件的入口文件。此时可以采用复合形式的写法：

```js
export { name, add } from "./calculator.js";
```

复合写法目前只支持当被导入模块（这里的 calculator.js）通过命名导出的方式暴露出来的变量，默认导出则没有对应的复合形式，只能将导入和导出拆开写。

```js
import calculator from "./calculator.js ";
export default calculator;
```

## CommonJS 与 ES6 Module 的区别

### 动态与静态

CommonJS 与 ES6 Module 最本质的区别在于前者对模块依赖的解决是“动态的”，而后者是“静态的”。在这里“动态”的含义是，模块依赖关系的建立发生在代码运行阶段；而“静态”则是模块依赖关系的建立发生在代码编译阶段。

```js
// calculator.js
module.exports = { name: "calculator" };
// index.js
const name = require("./calculator.js").name;
```

在上面介绍 CommonJS 的部分时我们提到过，当模块 A 加载模块 B 时（在上面的例子中是 index.js 加载 calculator.js），会执行 B 中的代码，并将其 module.exports 对象作为 require 函数的返回值进行返回。并且 require 的模块路径可以动态指定，支持传入一个表达式，我们甚至可以通过 if 语句判断是否加载某个模块。因此，在 CommonJS 模块被执行前，并没有办法确定明确的依赖关系，模块的导入、导出发生在代码的运行阶段。

```js
// calculator.js
export const name = "calculator";
// index.js
import { name } from "./calculator.js";
```

ES6 Module 的导入、导出语句都是声明式的，它不支持导入的路径是一个表达式，并且导入、导出语句必须位于模块的顶层作用域（比如不能放在 if 语句中）。因此我们说，ES6 Module 是一种静态的模块结构，在 ES6 代码的编译阶段就可以分析出模块的依赖关系。它相比于 CommonJS 来说具备以下几点优势：

1. 死代码检测和排除。我们可以用静态分析工具检测出哪些模块没有被调用过。比如，在引入工具类库时，工程中往往只用到了其中一部分组件或接口，但有可能会将其代码完整地加载进来。未被调用到的模块代码永远不会被执行，也就成为了死代码。通过静态分析可以在打包时去掉这些未曾使用过的模块，以减小打包资源体积。
2. 模块变量类型检查。JavaScript 属于动态类型语言，不会在代码执行前检查类型错误（比如对一个字符串类型的值进行函数调用）。ES6 Module 的静态模块结构有助于确保模块之间传递的值或接口类型是正确的。
3. 编译器优化。在 CommonJS 等动态模块系统中，无论采用哪种方式，本质上导入的都是一个对象，而 ES6 Module 支持直接导入变量，减少了引用层级，程序效率更高。

### 值拷贝与动态映射

在导入一个模块时，对于 CommonJS 来说获取的是一份导出值的拷贝；而在 ES6 Module 中则是值的动态映射，并且这个映射是只读的。

CommonJS 中的值拷贝：

```js
// calculator.js
var count = 0;
module.exports = {
  count: count,
  add: function(a, b) {
    count += 1;
    return a + b;
  }
};

// index.js
var count = require("./calculator.js").count;
var add = require("./calculator.js").add;
console.log(count); // 0（这里的 count 是对 calculator.js 中 count 值的拷贝）
add(2, 3);
console.log(count); // 0（calculator.js 中变量值的改变不会对这里的拷贝值造成影响）
count += 1;
console.log(count); // 1（拷贝的值可以更改）
```

ES6 Module 将上面的例子进行改写：

```js
// calculator.js
let count = 0;
const add = function(a, b) {
  count += 1;
  return a + b;
};
export { count, add };

// index.js
import { count, add } from "./calculator.js";
console.log(count); // 0（对 calculator.js 中 count 值的映射）
add(2, 3);
console.log(count); // 1（实时反映 calculator.js 中 count 值的变化）
count += 1;
console.log(count); // 不可更改，会抛出 SyntaxError: "count" is read-only
```

### 循环依赖

循环依赖是指模块 A 依赖于模块 B，同时模块 B 依赖于模块 A。

```js
// a.js
import { foo } from "./b.js";
foo();
// b.js
import { bar } from "./a.js";
bar();
```

在 CommonJS 中循环依赖的例子：

```js
// foo.js
const bar = require("./bar.js");
console.log("value of bar:", bar);
module.exports = "This is foo.js";

// bar.js
const foo = require("./foo.js");
console.log("value of foo:", foo);
module.exports = "This is bar.js";

// index.js
require("./foo.js");
```

理想状态下我们希望二者都能导入正确的值，并在控制台上输出。

```bash
value of foo: This is foo.js
value of bar: This is bar.js
```

而当我们运行上面的代码时，实际输出却是：

```bash
value of foo: {}
value of bar: This is bar.js
```

让我们从头梳理一下代码的实际执行顺序：

1. index.js 导入了 foo.js，此时开始执行 foo.js 中的代码。
2. foo.js 的第 1 句导入了 bar.js，这时 foo.js 不会继续向下执行，而是进入了 bar.js 内部。
3. 在 bar.js 中又对 foo.js 进行了 require，这里产生了循环依赖。需要注意的是，**执行权并不会再交回 foo.js，而是直接取其导出值，也就是 module.exports。但由于 foo.js 未执行完毕，导出值在这时为默认的空对象，因此当 bar.js 执行到打印语句时，我们看到控制台中的 value of foo 就是一个空对象。**
4. bar.js 执行完毕，将执行权交回 foo.js。
5. foo.js 从 require 语句继续向下执行，在控制台打印出 value of bar（这个值是正确的），整个流程结束。

我们再从 Webpack 的实现角度来看，将上面例子打包后，bundle 中有这样一段代码非常重要：

```js
// The require function
function __webpack_require__(moduleId) {
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  // Create a new module (and put it into the cache)
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
  });
  //...
}
```

当 index.js 引用了 foo.js 之后，相当于执行了这个 \_\_webpack_require\_\_ 函数，初始化了一个 module 对象并放入 installedModules 中。当 bar.js 再次引用 foo.js 时，又执行了该函数，但这次是直接从 installedModules 里面取值，此时它的 module.exports 是一个空对象

接下来让我们使用 ES6 Module 的方式重写上面的例子：

```js
// foo.js
import bar from "./bar.js";
console.log("value of bar:", bar);
export default "This is foo.js";

// bar.js
import foo from "./foo.js";
console.log("value of foo:", foo);
export default "This is bar.js";

// index.js
import foo from "./foo.js";
```

执行结果如下：

```bash
value of foo: undefined
value of bar: This is bar.js
```

很遗憾，在 bar.js 中同样无法得到 foo.js 正确的导出值，只不过和 CommonJS 默认导出一个空对象不同，这里获取到的是 undefined。

上面我们谈到，在导入一个模块时，CommonJS 获取到的是值的拷贝，ES6 Module 则是动态映射，那么我们能否利用 ES6 Module 的特性使其支持循环依赖呢？

请看下面这个例子：

```js
//index.js
import foo from "./foo.js";
foo("index.js");

// foo.js
import bar from "./bar.js";
function foo(invoker) {
  console.log(invoker + " invokes foo.js");
  bar("foo.js");
}
export default foo;

// bar.js
import foo from "./foo.js";
let invoked = false;
function bar(invoker) {
  if (!invoked) {
    invoked = true;
    console.log(invoker + " invokes bar.js");
    foo("bar.js");
  }
}
export default bar;
```

上面代码的执行结果如下：

```bash
index.js invokes foo.js
foo.js invokes bar.js
bar.js invokes foo.js
```

可以看到，foo.js 和 bar.js 这一对循环依赖的模块均获取到了正确的导出值。下面让我们分析一下代码的执行过程：

1. index.js 作为入口导入了 foo.js，此时开始执行 foo.js 中的代码。
2. 从 foo.js 导入了 bar.js，执行权交给 bar.js。
3. 在 bar.js 中一直执行到其结束，完成 bar 函数的定义。注意，此时由于 foo.js 还没执行完，foo 的值现在仍然是 undefined。
4. 执行权回到 foo.js 继续执行直到其结束，完成 foo 函数的定义。由于 ES6 Module 动态映射的特性，此时在 bar.js 中 foo 的值已经从 undefined 成为了我们定义的函数，这是与 CommonJS 在解决循环依赖时的本质区别，CommonJS 中导入的是值的拷贝，不会随着被夹在模块中原有值的变化而变化。
5. 执行权回到 index.js 并调用 foo 函数，此时会依次执行 foo→bar→foo，并在控制台打出正确的值。

由上面的例子可以看出，ES6 Module 的特性使其可以更好地支持循环依赖，只是需要由开发者来保证当导入的值被使用时已经设置好正确的导出值。

## 加载其他类型模块

前面我们介绍的主要是 CommonJS 和 ES6 Module，除此之外在开发中还有可能遇到其他类型的模块。有些如 AMD、UMD 等标准目前使用的场景已经不多，但当遇到这类模块时仍然需要知道如何去处理。

### 非模块化文件

如何使用 Webpack 打包这类文件呢？其实只要直接引入即可，如：

```js
import "./jquery.min.js";
```

这句代码会直接执行 jquery.min.js，一般来说 jQuery 这类库都是将其接口绑定在全局，因此无论是从 script 标签引入，还是使用 Webpack 打包的方式引入，其最终效果是一样的。

### AMD

AMD 是英文 Asynchronous Module Definition（异步模块定义）的缩写，它是由 JavaScript 社区提出的专注于支持浏览器端模块化的标准。从名字就可以看出它与 CommonJS 和 ES6 Module 最大的区别在于它加载模块的方式是异步的。下面的例子展示了如何定义一个 AMD 模块。

### UMD

严格来说，UMD 并不能说是一种模块标准，不如说它是一组模块形式的集合更准确。UMD 的全称是 Universal Module Definition，也就是通用模块标准，它的目标是使一个模块能运行在各种环境下，不论是 CommonJS、AMD，还是非模块化的环境（当时 ES6 Module 还未被提出）

### 加载 npm 模块

每一个 npm 模块都有一个入口。当我们加载一个模块时，实际上就是加载该模块的入口文件。这个入口被维护在模块内部 package.json 文件的 main 字段中。

## 模块打包原理

```js
// index.js
const calculator = require("./calculator.js");
const sum = calculator.add(2, 3);
console.log("sum", sum);

// calculator.js
module.exports = {
  add: function(a, b) {
    return a + b;
  }
};
```

上面的代码经过 Webpack 打包后将会成为如下的形式：

```js
// 立即执行匿名函数
(function(modules) {
  //模块缓存
  var installedModules = {};
  // 实现require
  function __webpack_require__(moduleId) { ... }
  // 执行入口模块的加载
  return __webpack_require__(__webpack_require__.s = 0);
}) ({
  // modules：以key-value的形式储存所有被打包的模块
  0: function(module, exports, __webpack_require__) {
    // 打包入口
    module.exports = __webpack_require__("3qiv");
  },
  "3qiv": function(module, exports, __webpack_require__) {
    // index.js内容
  }, jkzz: function(module, exports) {
    // calculator.js 内容
  }
});
```

上面的 bundle 分为以下几个部分：

1. 最外层立即执行匿名函数。它用来包裹整个 bundle，并构成自身的作用域。
2. installedModules 对象。每个模块只在第一次被加载的时候执行，之后其导出值就被存储到这个对象里面，当再次被加载的时候直接从这里取值，而不会重新执行。
3. \_\_webpack_require\_\_ 函数。对模块加载的实现，在浏览器中可以通过调用 \_\_webpack_require\_\_(module_id)来完成模块导入。
4. modules 对象。工程中所有产生了依赖关系的模块都会以 key-value 的形式放在这里。key 可以理解为一个模块的 id，由数字或者一个很短的 hash 字符串构成；value 则是由一个匿名函数包裹的模块实体，匿名函数的参数则赋予了每个模块导出和导入的能力。

接下来让我们看看一个 bundle 是如何在浏览器中执行的。

1. 在最外层的匿名函数中会初始化浏览器执行环境，包括定义 installedModules 对象、\_\_webpack_require\_\_ 函数等，为模块的加载和执行做一些准备工作。
2. 加载入口模块。每个 bundle 都有且只有一个入口模块，在上面的示例中，index.js 是入口模块，在浏览器中会从它开始执行。
3. 执行模块代码。如果执行到了 module.exports 则记录下模块的导出值；如果中间遇到 require 函数（准确地说是\_\_webpack_require\_\_），则会暂时交出执行权，进入\_\_webpack_require\_\_函数体内进行加载其他模块的逻辑。
4. 在\_\_webpack_require\_\_中会判断即将加载的模块是否存在于 installedModules 中。如果存在则直接取值，否则回到第 3 步，执行该模块的代码来获取导出值。
5. 所有依赖的模块都已执行完毕，最后执行权又回到入口模块。当入口模块的代码执行到结尾，也就意味着整个 bundle 运行结束。

不难看出，第 3 步和第 4 步是一个递归的过程。Webpack 为每个模块创造了一个可以导出和导入模块的环境，但本质上并没有修改代码的执行逻辑，因此代码执行的顺序与模块加载的顺序是完全一致的，这就是 Webpack 模块打包的奥秘。

## 参考

- Webpack 实践：入门、进阶与调优

-- EOF --
