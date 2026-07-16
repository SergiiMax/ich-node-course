// Создать простую систему логирования на основе EventEmitter.

// Создайте новый файл с именем `logger_example.js`.

// В этом файле создайте экземпляр EventEmitter.

// Зарегистрируйте обработчики для событий логирования разных уровней (info, warning, error).

// Сгенерируйте события логирования для каждого уровня.

const EventEmitter = require('events');
const emitter = new EventEmitter();
const infoHandler = message => {
  console.log('info: ', message);
};
const warningHandler = message => {
  console.log('warning: ', message);
};
const errorHandler = message => {
  console.log('error: ', message);
};
emitter.on('info', infoHandler);
emitter.on('warning', warningHandler);
emitter.on('error', errorHandler);
emitter.emit('info', 'the order is delivered');
emitter.emit('warning', 'the order is delayed');
emitter.emit('error', 'the order is lost');