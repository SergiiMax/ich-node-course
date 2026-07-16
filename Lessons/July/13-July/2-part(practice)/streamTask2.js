import fs from 'fs'

const writeStream = fs.createWriteStream('output.txt', 'utf-8')

writeStream.write("Задание 4 Запись данных в файл с использованием потоков Создайте новый файл для скрипта, например, `streamTask2.js`. Импортируйте модуль `fs` Определите данные, которые хотите записать в файл. Например, создайте строку с большим количеством текста или генерируйте данные в цикле. Используйте метод `fs.createWriteStream` для создания потока записи в новый файл, например, `output.txt`. Используйте метод `write` потока записи для записи данных в файл. Подпишитесь на события потока: `finish` - чтобы определить, когда запись данных завершена. `error` - чтобы обрабатывать возможные ошибки. После завершения записи данных закройте поток и выведите сообщение о завершении")
writeStream.end('End of writing')

writeStream.on('error', (err) => {
    console.error('Error occured writing file: ', err)
})

writeStream.on('finish', () => {
    console.log('Finish writing');
})