// 1.Создайте новый файл проекта. Откройте ваш редактор кода и создайте новый файл с именем `pathOperations.js`.
// 1.Импортируйте модуль `path`. В начале файла импортируйте встроенный модуль `path`.
// 1.Определите базовые переменные. Создайте две переменные: одна для директории, другая для имени файла. Например, директория - `/home/user/documents`, файл - `example.txt`.
// 1.Соедините пути. Используйте метод `join` модуля `path` для объединения директории и имени файла в один полный путь.
// 1.Получите расширение файла. Используйте метод `extname` модуля `path` для получения расширения файла из полного пути.
// 1.Выведите результаты в консоль. Выведите полученный полный путь и расширение файла в консоль.
// 1.Запустите ваш скрипт. В терминале перейдите в директорию с файлом `pathOperations.js` и выполните команду `node pathOperations.js` для запуска скрипта.

const path = require('path')

const directory = `/home/user/documents`
const filename = `example.txt`

const fullPath = path.join(directory, filename)
console.log('Full path: ', fullPath);

const extention = path.extname(fullPath)
console.log('File extention: ', extention);