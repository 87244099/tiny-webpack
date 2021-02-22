import test from "./test";
import manage from "./manage";
let common = require("./common");
common.commFn();

console.log('Hello World from your main file!');

test.testFn();
manage.manageFn();

export default {
    indexFn(){
        test.testFn();
    }
}