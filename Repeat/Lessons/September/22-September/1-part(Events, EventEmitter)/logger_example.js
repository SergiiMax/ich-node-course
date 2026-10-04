// Создать простую систему логирования на основе EventEmitter.
// 1.Создайте новый файл с именем `logger_example.js`.
// 1.В этом файле создайте экземпляр EventEmitter.
// 1.Зарегистрируйте обработчики для событий логирования разных уровней (info, warning, error).
// 1.Сгенерируйте события логирования для каждого уровня.

const EventEmitter = require("events");
const logger = new EventEmitter();

logger.on("info", (message) => {
  console.log("Info: ", message);
});

logger.on("warning", (message) => {
  console.log("Warning: ", message);
});

logger.on("error", (message) => {
  console.log("Error: ", message);
});

logger.emit('info', 'Application was started')
logger.emit('warning', 'Used memory is high!!!')
logger.emit('error', 'WTF Error')