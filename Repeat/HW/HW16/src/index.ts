// Task 1
function greetUser(name: string): void {
  console.log(`Hello, ${name}!`);
}

greetUser("Max");

// Task 2
interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
    console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}.`);
}

const firstPerson: Person = {
    name: "Sergii",
    age: 40,
    city: "Magdeburg"
}

printPersonInfo(firstPerson)

// Task 3
function squareNumber(num: number): number {
    return Math.pow(num, 2)
}

console.log(squareNumber(3));

// Task 4

function isEven(a: number): boolean {
    return a % 2 === 0
}

console.log(isEven(7));

// Task 5

interface Student {
    name: string,
    grade: number
}

function printStudentInfo(person: Student): void {
    console.log(`Студент: ${person.name}, Оценка: ${person.grade}`);
    
}

const firstStudent: Student = {
    name: "Sergii",
    grade: 1
}

printStudentInfo(firstStudent)

// Task 6

function logMessage(message: string): void {
    console.log(message);
}

logMessage("Wubba Lubba Dub-Dub!")