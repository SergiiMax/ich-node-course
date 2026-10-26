"use strict";
function greet(name) {
    return `Hello, ${name}`;
}
// let message: string = greet('Max');
let message = greet("Max");
console.log(message);
function multiplication(a, b) {
    return a * b;
}
function dedide(a, b) {
    return a / b;
}
console.log(multiplication(2, 3));
console.log(dedide(4, 2));
const user = {
    name: "Sergii",
    age: 40,
    email: "sergii@example.com",
};
function showUserInfo(user) {
    console.log(`Username: ${user.name}, User age: ${user.age}, User email: ${user.email}`);
}
showUserInfo(user);
//# sourceMappingURL=index.js.map