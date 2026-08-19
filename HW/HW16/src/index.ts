// task 1
function greetUser(name: string): void {
    console.log(`Hello ${name}!`);
}

// task 2
interface Person {
    name: string
    age: number
    city: string
}

function printPersonInfo(person: Person): void {
    console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`);
}

const person1 = {
    name: "Sergii", 
    age: 40, 
    city: "Magdeburg"
}
printPersonInfo(person1);

// task 3
function squareNumber(a: number): number {
    return a * a
}

// task 4
function isEven(num: number): boolean {
    return num % 2 === 0
}

// task 5
interface Student {
    name: string
    grade: number
}

function printStudentInfo(student: Student): void {
    console.log(`Студент: ${student.name}, Оценка: ${student.grade}`);
}

const student1 = {
    name: "Sergii",
    grade: 1
}
printStudentInfo(student1)

// task 6
function logMessage(text: string): void {
    console.log(text);
}