const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const babelCore = require("babel-core");
const traverse = require("babel-traverse").default;
const config = {
    entry:"./src/index.js"
}

let commjs = getAst("./src/index.js");
bundle(config.entry);

function bundle(entry){
    let result = `
        var unuse_module = {
            `;
    let list = getQueue(entry, entry);
    // 名称重复的模块要干掉
    let codeMapByName = {};
    list.forEach(item=>{
        if(!codeMapByName[item.name]){
            codeMapByName[item.name] = item.code;
        }
    })
    Object.keys(codeMapByName).forEach(codeName=>{
        let item = {
            name: codeName,
            code: codeMapByName[codeName]
        };
        
        let name = item.name.replace(/\\/g, "/");
        result += `'` + name  + `':function(require, module, exports){ `+ item.code +` },`;
    });
    result+=`
        };
    `;

    
    
    result+=`
        var module_cache = {};
        function require(filename){
            filename = filename.indexOf(".js") > -1 ? filename : (filename+".js");
            if(module_cache[filename]){
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
            
            return module.exports;
        }


        require("./src/index.js");
    `

    
    if(!fs.existsSync("./dist")){
        fs.mkdirSync("./dist");
    }
    fs.writeFileSync("./dist/main.js", result);
}

function getQueue(name, entry){
    let list = [];
    let dirname = entry ? "" : path.dirname(config.entry);
    let fileAbsPath = path.join(dirname, name);
    let ast = getAst(fileAbsPath);
    let deps = getDependences(ast);
    let code = ast2Code(ast);
    list.push({
        name,
        code
    });
    if(deps.length>0){
        deps.forEach(dep=>{
            dep = dep.endsWith(".js") ? dep : dep+".js";
            // 如果当前的路径和入口路径的目录是同级的情况，按路径
            // let dirname = path.dirname(name);
            // let filepath = path.join(dirname, dep);
            // let dirname = path.dirname(name) == path.dirname(config.entry) ? '' : path.dirname(config.entry);
            // let filepath = path.dirname(name) == path.dirname(config.entry) ? name :path.join(dirname, dep);
            list.push(...getQueue(dep));
        });
    }
;
    return list;
}

// code 2 ast
function getAst(filename){
    let content = fs.readFileSync(path.resolve(filename), "utf-8");
    return babylon.parse(content, {
        sourceType: "module"
    });
}

// 获取抽象树里面的依赖
function getDependences(ast){
    let deps = [];
    traverse(ast, {
        CallExpression({node}){
            if(node.callee.name === "require"){
                deps.push(node.arguments[0].value);
            }
        },
        ImportDeclaration({node}){
            deps.push(node.source.value)
        }
    });
    deps = [...new Set(deps)];
    return deps;
}

// ast 2 code
function ast2Code(ast){
    return babelCore.transformFromAst(ast, null,{
        presets: ["env"]//这里需要引入babel-preset-env模块
    }).code;
}
