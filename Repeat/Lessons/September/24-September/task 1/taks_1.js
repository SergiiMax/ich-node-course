const fs = require('fs');


fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err.message);
        return;
    }
    console.log(data);

    fs.writeFile('output.txt', data, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка при записи файла:', err.message);
            return;
        }
        console.log('Содержимое файла input.txt успешно скопировано в output.txt');
    })
});