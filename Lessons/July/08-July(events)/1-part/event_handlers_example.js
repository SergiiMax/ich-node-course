// Зарегистрировать несколько обработчиков на одно событие и удалить один из них.

// Создайте новый файл с именем `event_handlers_example.js`.

// В этом файле создайте экземпляр EventEmitter.

// Зарегистрируйте два обработчика на одно событие.

// Удалите один из обработчиков.

// Сгенерируйте событие и убедитесь, что остался только один обработчик.

// const firstGreetHandler = (data) => {
//     console.log('greetings!: ', data)
// }
// const secondGreetHandler = (data) => {
//     console.log('Second listener: greetings!!! ', data)
// }
// emitter.on('greet', firstGreetHandler)
// emitter.on('greet', secondGreetHandler)
// emitter.emit('greet', {value: 42})
// // emitter.removeListener('greet', secondGreetHandler)
// emitter.removeAllListeners('greet')
// emitter.emit('greet', {value: 42})

const EventEmitter = require('events')

const emitter = new EventEmitter()

const firstGreetHandler = (data) => {
    console.log('Hello ', data);
}
const secondGreetHandler = (data) => {
    console.log('Hi ', data);
}

emitter.on('greet', firstGreetHandler)
emitter.on('greet', secondGreetHandler)

emitter.emit('greet', 'all')
emitter.removeListener('greet', secondGreetHandler)
emitter.emit('greet', 'all')
