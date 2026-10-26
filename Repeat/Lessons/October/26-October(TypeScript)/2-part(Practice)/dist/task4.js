"use strict";
// Работа с массивами и типизацией
// Создайте массив чисел и напишите функцию `calculateSum`, которая принимает массив чисел и возвращает их сумму. Добавьте строгую типизацию.
const arrNum = [5, 12, 43, 434, 76, 9];
function calculateSum(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
}
console.log(calculateSum(arrNum));
//# sourceMappingURL=task4.js.map