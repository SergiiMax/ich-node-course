// task1

// Синхронная задача:

// Напишите простую функцию, которая складывает два числа и возвращает результат.

// Переделка в асинхронную задачу:

// Теперь переделайте эту функцию так, чтобы она выполнялась асинхронно. Используйте `setTimeout` для имитации задержки в 2 секунды.

function add(a: number, b: number): number {
    return a + b
}
// console.log(add(10, 5));

function addAsync(a: number, b: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}
// addAsync(10, 5).then(console.log);

// task2
// Проверка числа
// 1. Синхронная задача:
// Напишите функцию isEven, которая принимает число и возвращает true, если число чётное, и false, если нечётное.
// 2. Переделка в асинхронную задачу:
// Переделайте функцию так, чтобы она выполнялась асинхронно. Используйте setTimeout для имитации задержки в 2 секунды. Результат должен возвращаться через Promise.

function isEven(num: number): boolean {
    return num % 2 === 0
}
// console.log(isEven(5));

function asyncIsEven(num: number): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num % 2 === 0)
        }, 2000)
    })
}

// asyncIsEven(5).then(console.log)

// task3 ===========================================================================

// Получение имени пользователя
// 1. Синхронная задача:
// Напишите функцию getUserName, которая принимает объект пользователя:

const user = {
  id: 1,
  name: "Alex"
};

// Функция должна вернуть имя пользователя.
// 2. Переделка в асинхронную задачу:
// Переделайте функцию так, чтобы она выполнялась асинхронно. Используйте setTimeout для имитации получения данных с сервера через 2 секунды.
// Функция должна возвращать Promise, который успешно завершается именем пользователя.
// Дополнительно: вызовите функцию с помощью .then() и отдельно с помощью async/await.

type User = {
    id: number
    name: string
}

function getUserName(user: User): string {
    return user.name
}
// console.log(getUserName(user));

function asyncGetUserName(user: User): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user.name)
        }, 2000)
    })
}

asyncGetUserName(user).then(console.log)

async function test() {
    const res = await asyncGetUserName(user)
    console.log(res);
}

test()