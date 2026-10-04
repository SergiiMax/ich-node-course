// Создать событие, которое будет срабатывать только один раз.
// 1.Создайте новый файл с именем `once_example.js`.
// 1.В этом файле создайте экземпляр EventEmitter.
// 1.Зарегистрируйте одноразовый обработчик события.
// 1.Сгенерируйте событие несколько раз и убедитесь, что обработчик сработал только один раз.

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.once('oneTimeEvent', () => {
    console.log('This will be logged only once');
});

emitter.emit('oneTimeEvent');

console.log('---------');

emitter.emit('oneTimeEvent');