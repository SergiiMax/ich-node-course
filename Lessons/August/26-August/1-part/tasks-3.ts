// Задание 1 Создайте три функции, которые возвращают промисы, разрешающиеся через случайное время (например, от 1 до 3 секунд).
// Используйте `Promise.all`, чтобы дождаться выполнения всех промисов и вывести их результаты в консоль.

function task1(): Promise<string> {
    const delay = Math.floor(Math.random() * 3) + 1
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 1 completed")
        }, delay * 1000)
    })
}
function task2(): Promise<string> {
    const delay = Math.floor(Math.random() * 3) + 1
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 2 completed")
        }, delay * 1000)
    })
}
function task3(): Promise<string> {
    const delay = Math.floor(Math.random() * 3) + 1
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 3 completed")
        }, delay * 1000)
    })
}

async function runTasks() {
    const result = await Promise.all([
        task1(),
        task2(),
        task3()
    ])
    console.log(result)
}
// runTasks()

// Задание 2
// Напишите асинхронную функцию, которая пытается получить данные из API (используйте фейковый URL).
// Если запрос завершается ошибкой, обработайте её с помощью блока `try/catch` и выведите сообщение об ошибке.

async function fakeFetch() {
    try {
        const response = await fetch("http://fake-api.com/data")
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error("Error fetching data: ", error)
    }
}
// fakeFetch()

// Задание 3
// Создайте три асинхронные функции, которые возвращают промисы, разрешающиеся через разное время.
// Напишите функцию, которая вызывает эти функции последовательно, ожидая завершения каждой с использованием `await`.

async function first(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 1 completed")
        }, 1000)
    })
}
async function second(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 2 completed")
        }, 2000)
    })
}
async function third(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task 3 completed")
        }, 3000)
    })
}

async function runAll() {
    const res1 = await first()
    console.log(res1);
    const res2 = await second()
    console.log(res2);
    const res3 = await third()
    console.log(res3);
}

runAll()