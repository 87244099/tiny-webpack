import manage from "./manage";

require("./common").commFn();
manage.manageFn();
export default {
    testFn(){
        require("./common").commFn();
        manage.manageFn();
    }
}