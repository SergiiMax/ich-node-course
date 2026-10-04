// Создать экземпляр EventEmitter и зарегистрировать обработчик события.
// 1.Создайте новый файл с именем `event_emitter_example.js`.
// 1.В этом файле создайте экземпляр EventEmitter.
// 1.Зарегистрируйте обработчик события, который выводит сообщение в консоль.
// 1.Сгенерируйте событие, чтобы обработчик сработал.
// При запуске файла `event_emitter_example.js` в консоли должно появиться сообщение: `Событие произошло!`

const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on('myEvent', () => {
    console.log('Event was created');
})

emitter.emit('myEvent')