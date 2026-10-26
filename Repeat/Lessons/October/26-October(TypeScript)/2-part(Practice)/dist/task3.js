"use strict";
// Интерфейсы для типизации сложных объектов
// 1.Создайте интерфейс `Car`, который описывает автомобиль с полями `make`, `model`, `year`, и `isElectric`.
// 2.Напишите функцию, которая принимает объект типа `Car` и выводит информацию об автомобиле.
const bmw = {
    make: "BMW",
    model: "5 series",
    year: 2017,
    isElectric: false,
};
function carInfo(car) {
    console.log(`Марка: ${car.make}`);
    console.log(`Марка: ${car.model}`);
    console.log(`Год выпуска: ${car.year}`);
    console.log(`Электичка: ${car.isElectric}`);
}
carInfo(bmw);
//# sourceMappingURL=task3.js.map