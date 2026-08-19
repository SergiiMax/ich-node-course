// // const myName: string = "Sergii"
// // const mySurname: string = "Maksymenko"
// // const age: number = 40
// // const country: string = "Germany"
// // const city: string = "Magdeburg"
// // const isProgrammer: boolean = true
// // const oktoberfestPass: boolean = true
// // // console.log(myName, mySurname, age, isProgrammer, country, city, oktoberfestPass);

// // function multiply(a: number, b: number): number {
// //     return a * b
// // }

// // function reverseFn(text: string): string {
// //     const reversedText = text.split('').reverse().join("")
// //     return reversedText
// // }

// // // console.log(multiply(2, 7));
// // // console.log(reverseFn("Hello all!!!"));

// // /// геморрой
// // const user: {name: string, lastname: string, id: number} = {
// //     name: 'igor',
// //     lastname: 'egorov',
// //     id: 3
// // }

// // // best practice 1
// // type User = {
// //     name: string
// //     lastname: string
// // }

// // type id = string
// // const myFamili: id = "egorov"

// // const user2: User = {
// //     name: 'igor',
// //     lastname: 'egorov'
// // }

// // // best practice 2

// // interface User2 {
// //     name: string
// //     lastname: string
// // }

// // interface Admin extends User2 {
// //     // name: string
// //     // lastname: string
// //     role: string
// //     getRole: (roleId: string) => void
// // }

// // interface Pm extends User2 {
// //     // name: string
// //     // lastname: string
// //     data: string
// // }

// // const user3: User2 = {
// //     name: 'igor',
// //     lastname: 'egorov'
// // }

// // const user4: Admin = {
// //     name: 'neigor',
// //     lastname: 'neegorov',
// //     role: 'admin',
// //     getRole: (roleId) => {console.log('qwuquiw')}
// // }

// // const user5: Admin = {
// //     name: 'neigor',
// //     lastname: 'neegorov',
// //     role: 'admin',
// //     getRole: (roleId) => {console.log(multiply(3,4))}
// // }

// // console.log(user3, user4);

// // task 1.1
// const firstname: string = "Sergii";
// const age: number = 40;
// const isStudent: boolean = true;
// const height: number = 187;

// // task 1.2
// let city: string = "Fourty two";
// let count: number = 10;
// let active: boolean = true;

// // task 1.3
// function double(a: number): number {
//   return a * 2;
// }

// // task 2.1
// function greet(name: string): string {
//   const res = "Hello, " + name;
//   return res;
// }

// // task 2.2
// function sum(a: number, b: number): number {
//   return a + b;
// }
// // sum(5, "3");
// // будет ошибка потому как вторым параметром мы ввели строку
// // получим ошибку Argument of type 'string' is not assignable to parameter of type 'number'.

// // task 2.3
// function rateNumber(num: number, targetNum: number): string {
//   return num > targetNum
//     ? "Число больше targetNum"
//     : "Число меньше или равно targetNum";
// }

// // task 3
// // interface Book {
// //     title: string
// //     author: string
// //     yearPublished: number
// //     isAvailable: boolean
// // }

// // function printBookInfo(book: Book) {
// //     console.log(book);
// // }

// // const book1: Book = { title: "1984", author: "George Orwell", yearPublished: 1949, isAvailable: true }
// // const book2: Book = { title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960, isAvailable: false }
// // const book3: Book = { title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925, isAvailable: true }

// // printBookInfo(book1)
// // printBookInfo(book2)
// // printBookInfo(book3)


// // Variant 2

// // interface Book {
// //     title: string
// //     author: string
// //     yearPublished: number
// //     isAvailable: boolean
// // }

// // function printBookInfo(book: Book) {
// //     console.log({
// //         Название: book.title,
// //         Автор: book.author,
// //         Год_издания: book.yearPublished,
// //         Доступна: book.isAvailable
// //     });
// // }

// // const book1: Book = { title: "1984", author: "George Orwell", yearPublished: 1949, isAvailable: true }
// // const book2: Book = { title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960, isAvailable: false }
// // const book3: Book = { title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925, isAvailable: true }

// // printBookInfo(book1)
// // printBookInfo(book2)
// // printBookInfo(book3)

// // Variant 3

// interface Book {
//     title: string
//     author: string
//     yearPublished: number
//     isAvailable: boolean
// }

// function printBookInfo(book: Book) {
//     console.log({
//         Название: book.title,
//         Автор: book.author,
//         Год_издания: book.yearPublished,
//         Доступна: book.isAvailable
//     });
// }


// const books = [{ title: "1984", author: "George Orwell", yearPublished: 1949, isAvailable: true },
// { title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960, isAvailable: false },
// { title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925, isAvailable: true }]

// // books.forEach(book => {
// //     printBookInfo(book)
// // });

// // task 4

// // function isAdult(age: number): boolean {
// //     return age >= 18 ? true : false
// // }

// // console.log(isAdult(18));

// // Better practice
// type FirstName = {
//     name: string
// }
// type Age = {
//     age: string | number // UNION Type (string or number)
// }

// type Person = FirstName & Age // intersection
// // type Person2 = {
// //     name: string
// //     age: string | number // UNION Type (string or number)
// // }

// function isAdult(person: Person): boolean {
//     const age = typeof person.age === "string" ? Number(person.age) : person.age
//     return age >= 18
// }

// console.log(isAdult({name: "Sergii", age: 40}));
