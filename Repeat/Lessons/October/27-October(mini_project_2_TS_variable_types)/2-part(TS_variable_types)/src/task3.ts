function showString(str: string): void {
    console.log(str);
}

function throwError(msg: string): never {
    throw new Error(msg);
}

showString('Hello')
throwError('Invalid')

function describeValue(value: unknown): string {
    if (typeof value === 'string') {
        return `Строка из ${value.length} символов`
    } else if (typeof value === 'number') {
        return `Число, умноженное на 2: ${value * 2}`
    } else if (typeof value === 'boolean') {
        return value ? 'Да' : 'Нет'
    } else {
        return 'Неизвестный тип'
    }
}

console.log(describeValue('Hello'));
console.log(describeValue(12));
console.log(describeValue(true));
console.log(describeValue(null));