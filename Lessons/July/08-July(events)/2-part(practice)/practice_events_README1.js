// Практика: EventEmitter в Node.js
// Задачи идут от простого к сложному. Каждая проверяет одно конкретное свойство эмиттера. Решения — в конце файла, не подглядывать раньше времени.
// Заготовка для всех задач:

// const EventEmitter = require('node:events')
// const emitter = new EventEmitter()

// Задача 1. Первый слушатель
// Подпишись на событие login и выведи в консоль имя пользователя, которое придёт в данных.
// js emitter.emit('login', { user: 'Yury' })
// Ожидаемый вывод: Пользователь вошёл: Yury

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.on('login', (data) => {
//     console.log(`User loggined: ${data.user}`);

// })
// emitter.emit('login', { user: 'Sergii'})

// Задача 2. Несколько слушателей и порядок================================================================
// Подпишись на событие save двумя разными хендлерами. Первый пишет Сохраняю..., второй — Отправляю аналитику.... Вызови событие один раз.

// Вопрос на подумать: в каком порядке они выведутся и почему? Синхронно или асинхронно?
// Сначало будет "Сохраняю..."б потом "Отправляю аналитику....". Потому что emit работает синхронно, тоесть, если я правильно понял, когда я написал emitter.on('event', firstHandler) то получается добавил как бы первого слушателся, потом emitter.on('event', secondHandler) второго, и так далее, тоесть создаётся как бы очередь которая из слушателей, по которой будем прозодитб сверху вниз, тоеть кто первый записан тот первый и выведется...

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// const firstHandler = () => {
//     console.log("Saving...");
// }
// const secondHandler = () => {
//     console.log("Sending the analytics...");
// }

// emitter.on('event', firstHandler)
// emitter.on('event', secondHandler)

// emitter.emit('event')

// Задача 3. once===============================================================================================
// Сделай так, чтобы обработчик события connect сработал только один раз, даже если событие вызвать трижды.

// js emitter.emit('connect')
// emitter.emit('connect')
// emitter.emit('connect')
// Ожидаемый вывод: Подключились (один раз)

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.once('connect', (text) => {
//     console.log('Connected');

// })

// emitter.emit('connect')
// emitter.emit('connect')
// emitter.emit('connect')

// Задача 4. Отписка==========================================================================================================

// Подпиши на событие tick именованный обработчик. Вызови событие, потом отпишись через off() (он же removeListener), потом вызови событие снова. Второй вызов не должен ничего вывести.

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// const handler = () => {
//     console.log('Hello...');
// }

// emitter.on('tick', handler)

// emitter.emit('tick')
// emitter.off('tick', handler)
// emitter.emit('tick')

// Задача 5. Данные из emit=======================================================================================================
// Сделай счётчик заказов. На каждое событие order увеличивай внешнюю переменную total на сумму из данных заказа и выводи текущий итог.

// js  emitter.emit('order', { price: 100 })
// emitter.emit('order', { price: 250 })
// Ожидаемый вывод:
// Итого: 100
// Итого: 350

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// let total = 0
// const handler = (order) => {
//     total += order.price
//     console.log(`Итого: ${total}`);
// }

// emitter.on('order', handler)
// emitter.emit('order', { price: 100 })
// emitter.emit('order', { price: 250 })

// Задача 6. Событие 'error'============================================================================================
// Заэмить событие 'error' без единого слушателя и запусти файл. Опиши, что произошло с процессом.
// Затем повесь слушатель на 'error', который выводит Поймали ошибку: <текст>, и заэмить снова. Сравни поведение.

// js// emitter.emit('error', new Error('что-то сломалось'))
// Это главный практический навык темы. Без него стримы и сокеты роняют прод.

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.emit('error', new Error('что-то сломалось'))

// выдало ошибку "Unhandled 'error' event" тоесть необработанное событие, что не удивительно ведь мы его не щарегистрировали, но при этом "Error: что-то сломалось" показывает...

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// emitter.on('error', (err) => {
//     console.log(`Поймали ошибку: ${err.message}`);

// })
// emitter.emit('error', new Error('что-то сломалось'))

// Теперь ошибку не выкидывает и всё работает как должно, мы зарегистрировали событие и потом сгенерировали его.
// Результат: "Поймали ошибку: что-то сломалось"

// Задача 7. Проверка на утечку слушателей===================================================================================

// Напиши функцию subscribe(), которая при каждом вызове вешает новый слушатель на событие data. Вызови её 11 раз. Запусти и опиши, что напечатает Node в консоль.

// Затем исправь код так, чтобы предупреждения не было (подписаться нужно один раз).

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// const subscribe = () => {
//     emitter.on('data', () => {
//         console.log('Data created');
// })
// }
// for(let i=0; i < 11; i++) {
//     subscribe()
// }
// emitter.emit('data')
// Результат: "node:1832) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 data listeners added to [EventEmitter]. MaxListeners is 10. Use emitter.setMaxListeners() to increase limit"

// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// const handler = () => {
//   console.log("Data created");
// };

// emitter.on("data", handler);
// emitter.emit("data");

// Подписаоись один раз и теперь ошибки нет...

// Задача 8. Своя доменная развязка===============================================================================================

// Собери мини-OrderService на классе, который наследуется от EventEmitter. Метод create(order) сохраняет заказ (просто console.log) и эмитит событие order.created. Снаружи подпиши на это событие три независимых обработчика: отправка письма, аналитика, резерв склада. Сервис не должен ничего знать про эти три действия.

// Не делал.............