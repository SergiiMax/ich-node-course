// task 1
// Регистрация нескольких обработчиков на одно событие

// Создайте новый файл с именем `multiple_handlers.js`.

// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.

// Зарегистрируйте первый обработчик для события `event`.

// Зарегистрируйте второй обработчик для того же события `event`.

// Сгенерируйте событие `event`.

// Запустите скрипт и убедитесь, что оба обработчика вызываются при генерации события.

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// const firstHandler = text => {
//     console.log('What is your name? ', text);
// }
// const secondHandler = text => {
//     console.log('How can I call you? ', text);
// }

// emitter.on('event', firstHandler)
// emitter.on('event', secondHandler)

// emitter.emit('event', 'Sergii')


// task 2 ================================================================
// Удаление обработчика события

// Создайте новый файл с именем `remove_handler.js`.

// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.

// Определите функцию-обработчик, которая будет регистрироваться для события `event`.

// Зарегистрируйте этот обработчик для события `event`.

// Сгенерируйте событие `event` и убедитесь, что обработчик вызывается.

// Удалите зарегистрированный обработчик для события `event`.

// Снова сгенерируйте событие `event` и убедитесь, что обработчик больше не вызывается.

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// const handler = text => {
//     console.log('What is your name? ', text);
// }
// emitter.on('event', handler)
// emitter.emit('event', 'Sergii')
// emitter.off('event', handler)
// emitter.emit('event', 'Sergii')

// task 3 =================================================================
// Использование метода `once` для одноразовых событий

// Создайте новый файл с именем `once_handler.js`.

// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.

// Зарегистрируйте обработчик для события `event` с использованием метода `once`.

// Сгенерируйте событие `event` и убедитесь, что обработчик вызывается.

// Снова сгенерируйте событие `event` и убедитесь, что обработчик больше не вызывается, так как он был одноразовым.

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// const handler = text => {
//     console.log('What is your name? ', text);
// }
// emitter.once('event', handler)
// emitter.emit('event', 'Sergii')
// emitter.emit('event', 'Sergii')


// task 4 ================================================================
// Таймер обратного отсчета

// setTimeout(() => {
// }, 1000)

// Создайте новый файл с именем `countdown_timer.js`.

// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.

// Напишите функцию `countdown`, которая принимает количество секунд и объект `EventEmitter`.

// Внутри функции `countdown` используйте `setInterval`, чтобы каждую секунду генерировать событие `tick` с текущим оставшимся временем.

// Когда таймер достигнет нуля, генерируйте событие `end` и остановите интервал.

// Зарегистрируйте обработчики для событий `tick` и `end`, чтобы выводить сообщения в консоль.

// Вызовите функцию `countdown` с начальным временем и вашим объектом `EventEmitter`.

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// const countdown = (sec, emitter) => {
//     const interval = setInterval(() => {
//         emitter.emit('tick', sec)

//         if(sec === 0) {
//             clearInterval(interval)
//             emitter.emit('end')
//         }
//         sec--
//     }, 1000)
// }

// emitter.on('tick', (time) => {
//     console.log(`${time} to finish`);
// })

// emitter.on('end', () => {
//     console.log('Time is over');
// })

// countdown(5, emitter)

// task 5 ===============================================================
// Система уведомлений

// Создайте новый файл с именем `notification_system.js`.

// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.

// Напишите функцию `sendNotification`, которая принимает сообщение и объект `EventEmitter`.

// Внутри функции `sendNotification` генерируйте событие `notification` с переданным сообщением.

// Зарегистрируйте несколько обработчиков для события `notification`, например, один для логирования в консоль, другой для записи в файл.

// Вызовите функцию `sendNotification` несколько раз с разными сообщениями.

// const EventEmitter = require('events')
// const fs = require('fs')

// const emitter = new EventEmitter()

// const sendNotification = (message, emitter) => {
//     emitter.emit('notification', message)
// }

// emitter.on('notification', (message) => {
//     console.log(`New notification: ${message}`);
// })

// emitter.on('notification', (message) => {
//     fs.appendFile('notifications.txt', message, (err) => {
//         if(err) {
//             console.log('Error during wrire: ', err);
//         return
//         }
//         console.log('The message has been saved to a file');
//     })
// })

// sendNotification("User loggined", emitter)
// sendNotification('New message received', emitter)
// sendNotification('Copying to file completed', emitter)

// task 6 ===============================================================
// Управление состоянием пользователя

// Создайте новый файл с именем `user_state.js`.

// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.

// Напишите функцию `changeUserState`, которая принимает новый статус и объект `EventEmitter`.

// Внутри функции `changeUserState` генерируйте событие `stateChange` с переданным статусом.

// Зарегистрируйте обработчики для события `stateChange`, чтобы выводить новый статус в консоль.

// Вызовите функцию `changeUserState` несколько раз с разными статусами.

const EventEmitter = require('events')
const emitter = new EventEmitter()

const changeUserState = (state, emitter) => {
    emitter.emit(`stateChange`, state)
}

emitter.on('stateChange', (state) => {
    console.log(`New State: ${state}`);
    
})

changeUserState('loggined', emitter)
changeUserState('not found', emitter)
changeUserState('deleted', emitter)