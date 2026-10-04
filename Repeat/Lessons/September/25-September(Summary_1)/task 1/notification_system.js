const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const emitter = new EventEmitter();
const filePath = path.join(__dirname, 'example.txt');
const sendNotification = (message, emitter) => {
  emitter.emit('notification', message);
};
emitter.on('notification', (message) => {
  console.log('Получено новое уведомление:', message);
});
emitter.on('notification', (message) => {
  fs.writeFile(filePath, message, 'utf-8', (err) => {
    if (err) {
      console.error('Ошибка при записи файла', err.message);
      return;
    }
  });
});
emitter.once('notification', () => {
  console.log('Операция успешно завершена');
});
sendNotification('Hello, World!', emitter);