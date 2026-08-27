// <!-- Создать асинхронную функцию, которая вызывает несколько промисов последовательно с использованием `await`.

// Создайте новый файл TypeScript, например, `asyncAwaitExample.ts`.

// Напишите несколько функций, которые возвращают промисы (например, симуляции асинхронных операций).

// Создайте асинхронную функцию, которая последовательно вызывает эти функции с использованием `await`.

// Добавьте обработку ошибок с использованием блока `try/catch`. -->

function asyncAdd(a: number, b: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
}

function asyncMultiply(a: number, b: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a * b);
    }, 3000);
  });
}

function asyncDeduction(a: number, b: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a - b);
    }, 5000);
  });
}

async function asyncRun(): Promise<void> {
  try {
    const res = await asyncAdd(5, 4);
    console.log(res);
    const res2 = await asyncMultiply(2, 3);
    console.log(res2);
    const res3 = await asyncDeduction(6, 3);
    console.log(res3);
  } catch (error) {
    console.error(error);
  }
}

// asyncRun()

// task4  ==============================================================

// Последовательная обработка заказа
// Создать асинхронную функцию, которая выполняет несколько операций с заказом последовательно с использованием await.
// Создайте файл orderProcessing.ts.
// Создайте несколько функций, возвращающих Promise:
// createOrder() — имитирует создание заказа и возвращает его id через 1 секунду.
// processPayment() — принимает orderId, имитирует оплату через 2 секунды.
// sendConfirmation() — принимает orderId, имитирует отправку подтверждения через 1 секунду.
// Создайте функцию processOrder(), которая последовательно вызывает эти функции с помощью await.
// Добавьте обработку ошибок через try/catch.
// Если какая-либо операция завершилась ошибкой, выведите сообщение об ошибке в консоль.

function createOrder(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

function processPayment(orderId: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("success");
      resolve();
    }, 2000);
  });
}

function sendConfirmation(orderId: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Confirmed");
      resolve();
    }, 1000);
  });
}

async function processOrder(): Promise<void> {
  try {
    const orderID = await createOrder();
    await processPayment(orderID);
    await sendConfirmation(orderID);
  } catch (error) {
    console.error(error);
  }
}
// processOrder()

// task5 ==============================================================

// Создать функцию, которая имитирует вызов к внешнему API("https://jsonplaceholder.typicode.com/users") с возможностью возникновения ошибки (например, случайный отказ через `reject`).
// Создайте новый файл TypeScript, например, `errorHandlingExample.ts`.
// Напишите функцию, которая возвращает промис и случайным образом разрешается или отклоняется.
// В асинхронной функции используйте `try/catch` для обработки ошибок.
// Добавьте блок `finally`, который выводит сообщение о завершении операции.

type User1 = {
  id: number
  name: string
}

async function fetchUsers(): Promise<User1[]> {
    try {
        const random = Math.random()
        if (random < 0.5) {
            throw new Error("random rejection")
        }
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching data: ", error)
        throw error
    } 
}

async function getUsers() {
    try {
        const users = await fetchUsers()
        console.log(users)
    } catch (error) {
        console.error(error)
    } finally {
        console.log("Operetion completed");
    }
}

getUsers()