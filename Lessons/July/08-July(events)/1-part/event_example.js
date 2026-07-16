// Создать экземпляр EventEmitter и зарегистрировать обработчик события.

// Создайте новый файл с именем `event_emitter_example.js`.

// В этом файле создайте экземпляр EventEmitter.

// Зарегистрируйте обработчик события, который выводит сообщение в консоль.

// Сгенерируйте событие, чтобы обработчик сработал.

// При запуске файла `event_emitter_example.js` в консоли должно появиться сообщение: `Событие произошло!`

const EventEmitter = require('events')

const emitter = new EventEmitter()

// emitter.on('greet', () => {
//     console.log('Hello world!!!');
// })

// emitter.emit('greet')

emitter.once('greeting', () => {
    console.log('Hello from Node!!!');
})

emitter.emit('greeting')
emitter.emit('greeting')