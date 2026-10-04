// Зарегистрировать несколько обработчиков на одно событие и удалить один из них.
// 1.Создайте новый файл с именем `event_handlers_example.js`.
// 1.В этом файле создайте экземпляр EventEmitter.
// 1.Зарегистрируйте два обработчика на одно событие.
// 1.Удалите один из обработчиков.
// 1.Сгенерируйте событие и убедитесь, что остался только один обработчик.

const EventEmitter = require("events");
const emitter = new EventEmitter();

const firstHandler = (data) => {
    console.log('First handler: ', data);
}

const secondHandler = (data) => {
    console.log('Second handler: ', data);
}

emitter.on('myEvent', firstHandler)
emitter.on('myEvent', secondHandler)

emitter.emit('myEvent', 'Test')

emitter.removeListener('myEvent', firstHandler)

console.log('-------------------');

emitter.emit('myEvent', 'Test')

emitter.removeAllListeners('myEvent')

console.log('-------------------');

emitter.emit('myEvent', 'Test')