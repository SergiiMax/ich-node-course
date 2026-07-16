// Создайте новый проект:
// В терминале перейдите в каталог, где хотите создать проект.
// Выполните команду `npm init -y`, чтобы инициализировать новый проект с файлом `package.json`.

// Установите axios:
// Выполните команду `npm install axios`, чтобы установить библиотеку `axios`.

// Создайте файл для выполнения запроса:
// В корневом каталоге проекта создайте файл `axios-example.js`.

// Настройте axios для выполнения GET-запроса:
// Откройте файл `axios-example.js` в текстовом редакторе.
// Импортируйте модуль `axios`.
// Настройте GET-запрос к публичному API JSONPlaceholder (`https://jsonplaceholder.typicode.com/todos/1`). Выведите результат запроса в консоль.

// 5.    Запустите скрипт: в терминале выполните команду `node axios-example.js`, чтобы запустить скрипт и увидеть результат в консоли.

const axios = require('axios')
axios.get(`https://rickandmortyapi.com/api/character`)
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error fatching data: ', error)
})