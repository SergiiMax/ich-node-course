"use strict";
function showString(str) {
    console.log(str);
}
function throwError(msg) {
    throw new Error(msg);
}
showString('Hello');
throwError('Invalid');
function describeValue(value) {
    if (typeof value === 'string') {
        return `Строка из ${value.length} символов`;
    }
    else if (typeof value === 'number') {
        return `Число, умноженное на 2: ${value * 2}`;
    }
    else if (typeof value === 'boolean') {
        return value ? 'Да' : 'Нет';
    }
    else {
        return 'Неизвестный тип';
    }
}
console.log(describeValue('Hello'));
console.log(describeValue(12));
console.log(describeValue(true));
console.log(describeValue(null));
//# sourceMappingURL=task3.js.map