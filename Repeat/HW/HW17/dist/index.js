"use strict";
// Task 1
function calculateTotal(price, quantity, discount = 0) {
    return price * quantity * (1 - discount / 100);
}
console.log(calculateTotal(100, 3));
console.log(calculateTotal(100, 3, 10));
// Task 2
let id = "asd123";
function displayId(id) {
    if (typeof id === "string") {
        console.log(`ID: ${id.toUpperCase()}`);
    }
    else if (typeof id === "number") {
        console.log(`ID: ${id * 10}`);
    }
}
displayId(id);
displayId(25);
displayId("test");
const orders = [
    { orderId: "ORD-001", amount: 150, status: "pending" },
    { orderId: "ORD-002", amount: 300, status: "shipped" },
    { orderId: "ORD-003", amount: 200, status: "delivered" },
    { orderId: "ORD-004", amount: 100, status: "pending" },
];
function filterOrdersByStatus(orders, status) {
    return orders.filter((order) => order.status === status);
}
console.log(filterOrdersByStatus(orders, 'pending'));
//# sourceMappingURL=index.js.map