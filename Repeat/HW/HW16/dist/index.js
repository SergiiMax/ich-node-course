"use strict";
// Task 1
function greetUser(name) {
    console.log(`Hello, ${name}!`);
}
greetUser("Max");
function printPersonInfo(person) {
    console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}.`);
}
const firstPerson = {
    name: "Sergii",
    age: 40,
    city: "Magdeburg"
};
printPersonInfo(firstPerson);
// Task 3
function squareNumber(num) {
    return Math.pow(num, 2);
}
console.log(squareNumber(3));
// Task 4
function isEven(a) {
    return a % 2 === 0;
}
console.log(isEven(7));
function printStudentInfo(person) {
    console.log(`Студент: ${person.name}, Оценка: ${person.grade}`);
}
const firstStudent = {
    name: "Sergii",
    grade: 1
};
printStudentInfo(firstStudent);
// Task 6
function logMessage(message) {
    console.log(message);
}
logMessage("Wubba Lubba Dub-Dub!");
//# sourceMappingURL=index.js.map