"use strict";
function addition(a, b) {
    return a + b;
}
console.log(addition(2, 2));
function stringToUpperCase(str) {
    return str.toUpperCase();
}
console.log(stringToUpperCase('hello all!!!'));
function unionFunction(value) {
    if (typeof value === 'string') {
        return `${value.length}`;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else if (typeof value === 'boolean') {
        return value;
    }
}
console.log(unionFunction('text'));
console.log(unionFunction(26));
console.log(unionFunction(true));
//# sourceMappingURL=task2.js.map