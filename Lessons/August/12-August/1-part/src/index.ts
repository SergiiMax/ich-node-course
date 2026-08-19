// const text: string = "Hello all!!!"
// const num: number = 7
// const isStudent: boolean = true

// const nullVariable: null = null
// const undefinedVariable: undefined = undefined
// const anyVariable: any = "Annie, are you ok?"

// // text = 5

// function explainString(param: string): string {
//     return `${param} is a string`
// }
// function explainNumber(param: number): string {
//     return `${param} is a number`
// }
// function explainBoolean(param: boolean): string {
//     return `${param} is a boolean`
// }
// function explainNull(param: null): string {
//     return `${param} is a null`
// }
// function explainUndefined(param: undefined): string {
//     return `${param} is a undefined`
// }
// function explainAny(param: any): string {
//     return `${param} is a any type`
// }

// console.log(explainString(text));
// console.log(explainNumber(num));
// console.log(explainBoolean(isStudent));
// console.log(explainNull(nullVariable));
// console.log(explainUndefined(undefinedVariable));
// console.log(explainAny(anyVariable));

// function division(a: number, b: number): number {
//     return a / b
// }
// console.log(division(4, 2));

// interface Car {
//     brand: string
//     model: string
//     year: number
//     isElectric: boolean
// }
// function carInfo(car: Car): void {
//     console.log(car);
// }
// const bmw = {
//     brand: "BMW",
//     model: "M5",
//     year: 2021,
//     isElectric: false
// }
// carInfo(bmw)

// const numbers = [1, 2, 3, 4, 5, 6, 7]
// function calculateSum(arr: number[]): number {
//     let sum = 0
//     for (const item of arr) {
//         sum += item
//     }
//     return sum
// }
// console.log(calculateSum(numbers));

// interface Task {
//     title: string
//     description: string
//     isCompleted: boolean
// }

// function showOnlyNotCompletedTasks(tasks: Task[]): Task[] {
//     return tasks.filter(task => !task.isCompleted)
// }
// const tasks: Task[] = [
//     {
//         title: "Learn TypeScript",
//         description: "Learn interfaces and types",
//         isCompleted: false
//     },
//     {
//         title: "Do homework",
//         description: "Complete TypeScript homework",
//         isCompleted: true
//     },
//     {
//         title: "Practice arrays",
//         description: "Practice array methods",
//         isCompleted: false
//     }
// ];
// console.log(showOnlyNotCompletedTasks(tasks));

// function greet(name: string, age: number): void {
//     console.log(`My name is: ${name} and my age is: ${age}`);
// }
// greet("Sergii", 40)

// function convertToUpperCase(string: string): string {
//     return string.toUpperCase()
// }
// console.log(convertToUpperCase('greetings from sergii'));

// task 3.1
const scores: number[] = [2, 4, 2, 5, 1 , 1 , 2]

function averageScore(scores: number[]): number {
    const res = scores.reduce((total, score) => total + score, 0)
    return Math.round(res/scores.length)
}
console.log(averageScore(scores));

// task 3.2
interface Product {
    name: string 
    price: number 
    inStock: boolean
}

const products: Product[] = [
    {
        name: "Laptop",
        price: 1200,
        inStock: true
    },
    {
        name: "Smartphone",
        price: 700,
        inStock: true
    },
    {
        name: "Printer",
        price: 200,
        inStock: false
    },
    {
        name: "Tablet",
        price: 800,
        inStock: false
    }
]

function listAvailableProducts(products: Product[]): void {
    products.filter(product => product.inStock).forEach(product => console.log(product.name));
}

listAvailableProducts(products);
