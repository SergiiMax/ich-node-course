const text: string = "Hello all!!!";
const number1: number = 17;
const isActive: boolean = false;
const nullValue: null = null;
let undefinedValue: undefined;

let foo: any = "foo string";
foo = 13;

function describeString(str: string): string {
    return `This is string:  ${str}`
}

function describeNumber(num: number): string {
    return `This is number:  ${num}`
}

function describeBoolean(value: boolean): string {
    return `This is boolean value:  ${value}`
}

function describeNull(value: null): string {
    return `This is null value:  ${value}`
}

function describeUndefined(value: undefined): string {
    return `This is undefined value:  ${value}`
}

console.log(describeString(text));
console.log(describeNumber(number1));
console.log(describeBoolean(isActive));
console.log(describeNull(nullValue));
console.log(describeUndefined(undefinedValue));