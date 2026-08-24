import type { AdminUser } from './types';
import type { Car } from "./types"
import type { Product } from "./types";
import type { Employee } from "./types";
import type { Student } from "./types";
import type { ConcatStringFn } from "./types";

const adminUser: AdminUser = {
  name: "Sergii",
  permissions: ["read", "write", "delete"],
  email: "sergii@example.com"
};

console.log(adminUser);

const myCar: Car = {
    make: "VW",
    model: "Passat",
    engine: {
        type: "Diesel",
        horsepower: 190
    }
}

function printCarInfo(car: Car): void {
  console.log(`Make: ${car.make}, Model: ${car.model}`);
  console.log(`Engine: ${car.engine.type}, Horse Power: ${car.engine.horsepower} h.p.`);
  
  if (car.year) {
    console.log(`Year: ${car.year}`);
  } else {
    console.log(`Year: not specified`);
  }
}
printCarInfo(myCar)

function calculateDiscount(product: Product, discount: number): number {
    return product.price * (1 - discount / 100)
}

const product1: Product = {
    name: "Laptop",
    price: 1200
}

console.log(calculateDiscount(product1, 20));

const myEmployees: Employee[] = [
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
]

function getSalaries(employees: Employee[]): number[] {
    return employees.map(employee => employee.salary)
}

console.log(getSalaries(myEmployees));

const student1: Student = {
    firstName: "Sergii",
    lastName: "Maksymenko",
    grade: 1
}

function printStudentInfo(student: Student): void {
    console.log(`student's name: ${student.firstName} ${student.lastName}, student's grade: ${student.grade}`);
}

printStudentInfo(student1)

const concatString: ConcatStringFn = (str1, str2) => {
    return `${str1} ${str2}`
}

console.log(concatString("Helo", "all!!!"));