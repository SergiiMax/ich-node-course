"use strict";
let value;
function readData(data) {
    if (typeof data === "string") {
        return data.length;
    }
    else {
        return data * 2;
    }
}
value = "Wabalabudabdab";
// console.log(readData(value));
value = 2;
const worker = {
    name: "Sergii",
    age: 40,
    position: "Student",
};
const user = {
    name: "John",
    age: 40,
    address: {
        city: "Magdeburg",
        street: "John-straße 77",
    },
};
function userInfo(info) {
    console.log(`User name: ${info.name}, age: ${info.age}, address: ${user.address.street}, ${user.address.city}`);
}
const products = [
    {
        name: "Laptop",
        price: 1000,
        description: "Very gooda",
        id: 1,
    },
    {
        name: "Keyboard",
        price: 100,
        id: 2,
    },
    {
        name: "Mouse",
        price: 1000,
        description: "Not so good",
        id: 3,
    },
];
function printProductsInfo(products) {
    products.forEach(product => {
        console.log(`Product name: ${product.name}, price: ${product.price}, id: ${product.id}, ${product.description ? `descriptiption: ${product.description}` : ""}`);
    });
}
const product = {
    name: "Laptop",
    price: 1000,
    // category: 'Technics'
};
const productProperties = (value) => `Name: ${value.name}, price: ${value.price}${value.category ? `, category: ${value.category}` : ""}`;
const employee = {
    name: 'Bob',
    age: 10,
    position: 'Super admin'
};
const employeeInfo = (info) => `Name: ${info.name}, position: ${info.position}`;
console.log(employeeInfo(employee));
//# sourceMappingURL=index.js.map