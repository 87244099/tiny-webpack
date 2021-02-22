
        var unuse_module = {
            './src/index.js':function(require, module, exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _test = require("./test");

var _test2 = _interopRequireDefault(_test);

var _manage = require("./manage");

var _manage2 = _interopRequireDefault(_manage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var common = require("./common");
common.commFn();

console.log('Hello World from your main file!');

_test2.default.testFn();
_manage2.default.manageFn();

exports.default = {
  indexFn: function indexFn() {
    _test2.default.testFn();
  }
}; },'./test.js':function(require, module, exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _manage = require("./manage");

var _manage2 = _interopRequireDefault(_manage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("./common").commFn();
_manage2.default.manageFn();
exports.default = {
  testFn: function testFn() {
    require("./common").commFn();
    _manage2.default.manageFn();
  }
}; },'./manage.js':function(require, module, exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  manageFn: function manageFn() {
    console.log("mange");
  }
}; },'./common.js':function(require, module, exports){ "use strict";

function commFn() {
  console.log("commFn");
}

module.exports = {
  commFn: commFn
}; },
        };
    
        var module_cache = {};
        function require(filename){
            filename = filename.indexOf(".js") > -1 ? filename : (filename+".js");
            if(module_cache[filename]){
                console.log(filename, module_cache[filename].exports);
                return module_cache[filename].exports;
            }

            var module = module_cache[filename] = {
                exports:{}
            };

            if(unuse_module.hasOwnProperty(filename)){
                //初始化模块
                unuse_module[filename](require, module, module.exports);
            }else{
                throw new Error('模块 '+ filename +' 不存在');
                return;
            }
            console.log(filename, module.exports);
            
            return module.exports;
        }


        require("./src/index.js");
    