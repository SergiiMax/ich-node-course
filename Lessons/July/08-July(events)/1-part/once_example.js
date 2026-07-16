// Создать событие, которое будет срабатывать только один раз.

// Создайте новый файл с именем `once_example.js`.

// В этом файле создайте экземпляр EventEmitter.

// Зарегистрируйте одноразовый обработчик события.

// Сгенерируйте событие несколько раз и убедитесь, что обработчик сработал только один раз.

const EventEmitter = require('events')
const emitter = new EventEmitter()

const greetHandler = (data) => {
    console.log("Man ", data);
}

emitter.once('greet', greetHandler)

emitter.emit('greet', 'WTF...???')
emitter.emit('greet', 'Hi')