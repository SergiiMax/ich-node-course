const adminUser = {
    name: "Sergii",
    permissions: ["read", "write", "delete"],
    email: "sergii@example.com"
};
console.log(adminUser);
// Task 2
const myCar = {
    make: "VW",
    model: "Passat",
    engine: {
        type: "Diesel",
        horsepower: 190
    }
};
function printCarInfo(car) {
    console.log(`Make: ${car.make}, Model: ${car.model}`);
    console.log(`Engine: ${car.engine.type}, Horse Power: ${car.engine.horsepower} h.p.`);
    if (car.year) {
        console.log(`Year: ${car.year}`);
    }
    else {
        console.log(`Year: not specified`);
    }
}
printCarInfo(myCar);
// Task 3
const calculateDiscount = (product, discount) => product.price * (1 - discount / 100);
const product1 = {
    name: "Laptop",
    price: 1200
};
console.log(calculateDiscount(product1, 20));
// Task 4
const myEmployees = [
    {
        name: "Sergii",
        salary: 3500
    },
    {
        name: "Andrii",
        salary: 3400
    },
    {
        name: "Alex",
        salary: 3300
    }
];
function getSalaries(employees) {
    return employees.map(employee => employee.salary);
}
console.log(getSalaries(myEmployees));
// Task 5
const student1 = {
    firstName: "Sergii",
    lastName: "Maksymenko",
    grade: 1
};
function printStudentInfo(student) {
    console.log(`student's name: ${student.firstName} ${student.lastName}, student's grade: ${student.grade}`);
}
printStudentInfo(student1);
// Task 6
const concatString = (str1, str2) => {
    return `${str1} ${str2}`;
};
console.log(concatString("Helo", "all!!!"));
export {};
//# sourceMappingURL=index.js.map