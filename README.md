# tiny-webpack
简易webpack，参考自 [手把手教你撸一个简易的 webpack](https://juejin.cn/post/6844903617971879949)

## 前置知识
- 模块系统，如ESM，COMMONJS，AMD，amd&cmd
- 抽象语法树，详见：https://esprima.org/demo/parse.html#

## webpack主要用途
- 代码支持ES6转ES5语法 
- 处理模块之间的依赖
- 生成可以在浏览器执行的js

## 最终支持特性
- 支持ES6转ES5
- 支持模块以COMMOMJS或EMS引入
- 在dist目录下生成最终脚本

## 常用命令
- yarn run build：打包生成代码
