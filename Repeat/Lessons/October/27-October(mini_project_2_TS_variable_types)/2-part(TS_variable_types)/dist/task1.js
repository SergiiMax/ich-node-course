"use strict";
const text = "Hello all!!!";
const number1 = 17;
const isActive = false;
const nullValue = null;
let undefinedValue;
let foo = "foo string";
foo = 13;
function describeString(str) {
    return `This is string:  ${str}`;
}
function describeNumber(num) {
    return `This is number:  ${num}`;
}
function describeBoolean(value) {
    return `This is boolean value:  ${value}`;
}
function describeNull(value) {
    return `This is null value:  ${value}`;
}
function describeUndefined(value) {
    return `This is undefined value:  ${value}`;
}
console.log(describeString(text));
console.log(describeNumber(number1));
console.log(describeBoolean(isActive));
console.log(describeNull(nullValue));
console.log(describeUndefined(undefinedValue));
//# sourceMappingURL=task1.js.map