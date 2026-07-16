// Установите пакет `moment`:
// В терминале введите команду: npm install moment

// Напишите скрипт, который выводит текущую дату и время в формате `YYYY-MM-DD HH:mm:ss` с использованием `moment`:
// Создайте файл `index.js`.
// Импортируйте модуль `moment`.
// Используйте функцию `moment` для получения текущей даты и времени и отформатируйте ее.

// Запустите скрипт: В терминале введите команду: node index.js. Вы должны увидеть текущую дату и время в формате `YYYY-MM-DD HH:mm:ss`.

const moment = require('moment')

const now = moment().format('MMMM Do YYYY, h:mm:ss a');
const endOfTheDay = moment().endOf('day').fromNow(); 
const startOfTheDay = moment().startOf('day').fromNow();
const dayOfWeek = moment().format('dddd');
const day = moment().format("MMM Do YY"); 
const day2 = moment().format('L');


console.log(now);
console.log(dayOfWeek);
console.log(day);
console.log(day2);
console.log(endOfTheDay);
console.log(startOfTheDay);
