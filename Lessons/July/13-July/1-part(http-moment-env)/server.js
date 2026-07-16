// Создайте новый проект (если его еще нет):
// В терминале перейдите в каталог, где хотите создать проект.
// Выполните команду `npm init -y`, чтобы инициализировать новый проект с файлом `package.json`.

// Установите dotenv:
// Выполните команду `npm install dotenv`, чтобы установить библиотеку `dotenv`.

// Создайте файл .env:
// В корневом каталоге проекта создайте файл с именем `.env`.
// Добавьте в файл строку `MY_VAR=HelloWorld`, чтобы задать значение переменной `MY_VAR`.

// Создайте файл для чтения переменной окружения:
// В корневом каталоге проекта создайте файл `dotenv-example.js`.

import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({message: 'Hello, client!'}))
})

server.listen(PORT, () => {
    console.log(`server is runnig at http://localhost:${PORT}`)
})