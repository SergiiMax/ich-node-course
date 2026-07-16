// Заготовка:

// js const EventEmitter = require('events')
// const emitter = new EventEmitter()

// Задача 1. forEach =================================================================

// На событие users прилетает массив имён. Выведи каждое имя отдельной строкой с номером.

// js// emitter.emit('users', ['Аня', 'Борис', 'Вика'])
// // Ожидаемо:
// // 1. Аня
// // 2. Борис
// // 3. Вика

// РЕШЕНИЕ--------------------------------------------------------

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.on('users', (arr) => {
//     arr.forEach((item, index) => {
//         console.log(`${index + 1} Name: `, item);
//     });
// })

// emitter.emit('users', ['Аня', 'Борис', 'Вика'])

// Задача 2. filter ==========================================================================

// На событие numbers прилетает массив чисел. Выведи только чётные.

// js// emitter.emit('numbers', [1, 2, 3, 4, 5, 6])
// // Ожидаемо: [ 2, 4, 6 ]

// РЕШЕНИЕ--------------------------------------------------------
// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.on('even', (data) => {
//     const res = data.filter(number => (number % 2) === 0)
//     console.log('Even numbers from array: ', res);
// })
// emitter.emit('even', [1, 2, 3, 4, 5, 6])

// Задача 3. map =================================================================

// На событие prices прилетает массив цен без налога. Выведи новый массив, где к каждой цене добавлено 20%.

// js// emitter.emit('prices', [100, 200, 50])
// // Ожидаемо: [ 120, 240, 60 ]

// РЕШЕНИЕ--------------------------------------------------------
// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.on('prices', (data) => {
//     const res = data.map(item => item * 1.2)
//     console.log('Prices with tax(20%): ', res);
// })

// emitter.emit('prices', [100, 200, 50])

// Задача 4. reduce==========================================================

// На событие cart прилетает массив товаров { name, price }. Посчитай и выведи общую сумму корзины.

// js// emitter.emit('cart', [
// //   { name: 'книга', price: 300 },
// //   { name: 'ручка', price: 50 },
// //   { name: 'тетрадь', price: 80 },
// // ])
// // Ожидаемо: Итого: 430

// РЕШЕНИЕ--------------------------------------------------------------------
// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.on('cart', (data) => {
//     const res = data.reduce((acc, cur) => acc + cur.price, 0)
//     console.log('Total: ', res);

// })

// emitter.emit('cart', [
//   { name: 'книга', price: 300 },
//   { name: 'ручка', price: 50 },
//   { name: 'тетрадь', price: 80 },
// ])

// Задача 5. find ===================================================================

// На событие search прилетает массив пользователей { id, name } и искомый id (двумя аргументами). Найди и выведи имя пользователя с этим id, либо не найден.

// js// emitter.emit('search', [{ id: 1, name: 'Аня' }, { id: 2, name: 'Борис' }], 2)
// // Ожидаемо: Найден: Борис

// РЕШЕНИЕ--------------------------------------------------------------------
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// emitter.on("search", (data, id) => {
//   const user = data.find((item) => item.id === id);

//   user ? console.log("User name: ", user.name) : console.log("User not found");
// });

// emitter.emit('search', [{ id: 1, name: 'Аня' }, { id: 2, name: 'Борис' }], 2)

// Задача 6. some / every ============================================================

// На событие check прилетает массив оценок. Выведи две строки: есть ли хоть одна двойка, и все ли оценки — проходные (>= 3).

// js// emitter.emit('check', [5, 4, 3, 5])
// // Ожидаемо:
// // Есть двойки: false
// // Все сдали: true

// РЕШЕНИЕ--------------------------------------------------------------------
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// emitter.on('check', (data) => {
//     const hasTwo = data.some(item => item === 2)
//     const isPassed = data.every(item => item >= 3)

//     console.log('Has grade "2": ', hasTwo);
//     console.log('Passed: ', isPassed);
// })

// emitter.emit('check', [5, 4, 3, 5])

// Задача 7. Накопление между событиями (цикл жизни + массив) ============================

// Заведи внешний массив log = []. На каждое событие action добавляй в него пришедшую строку. На событие report выведи весь массив и его длину. Проверь, что данные копятся между вызовами.

// emitter.emit('action', 'вход')
// emitter.emit('action', 'клик')
// emitter.emit('action', 'выход')
// emitter.emit('report')
// // Ожидаемо:
// // Действия: [ 'вход', 'клик', 'выход' ]
// // Всего: 3

// РЕШЕНИЕ--------------------------------------------------------------------
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// const log = []

// emitter.on('action', (data) => {
//     log.push(data)
// })
// emitter.on('report', () => {
//     console.log('Content: ', log, 'Array length: ', log.length);
// })

// emitter.emit('action', 'вход')
// emitter.emit('action', 'клик')
// emitter.emit('action', 'выход')
// emitter.emit('report')

// Задача 8. Цикл эмитов (for + emit)========================================================

// Один раз подпишись на событие tick, обработчик выводит пришедшее число, возведённое в квадрат. Затем в цикле for от 1 до 5 заэмить это событие, передавая номер итерации.

// js// Ожидаемо: 1, 4, 9, 16, 25 — каждое с новой строки

// Вопрос чисто от меня: почему подписку делаем один раз до цикла, а не внутри него? (Ответ написать ниже под решением шоб я посмотрел потом)

// РЕШЕНИЕ--------------------------------------------------------------------
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// emitter.on('tick', (number) => {
//     const result = Math.pow(number, 2);
//     console.log(result);
// })

// for( let i = 1; i < 6; i++) {
//     emitter.emit('tick', i)
// }

// Почему подписку делаем один раз до цикла, а не внутри него? 

// Плтому что при подписке мы говорим что будет происходить, а генерацию мы помещаем в цикл и она отрабатывает с заданым условием, то есть в подписку мы кладём логику, поэтому и нет смысла дёргать её по несколько раз, а вот emit другое дело, его то мы и можем юзать сколько нужно, в данном случае в цикле нужное кол-во раз...