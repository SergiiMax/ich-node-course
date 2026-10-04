const fs = require("fs");

// try {
//   const data = fs.readFileSync("input.txt", "utf-8");
//   console.log(`File's content: ${data}`);
//   fs.writeFileSync("output.txt", data, 'utf-8');
//   console.log('The file contents were successfully copied');
// } catch (err) {
//   console.error("Error during work with a file system: ", err.message);
// }

let stage; // текущая операция

try {
    stage = 'чтении файла input.txt';
    const data = fs.readFileSync('input.txt', 'utf-8');
    console.log('Содержимое файла:', data);

    stage = 'записи файла output.txt';
    fs.writeFileSync('output.txt', data, 'utf-8');
    console.log(
        'Содержимое файла input.txt успешно скопировано в файл output.txt',
    );
} catch (error) {
    console.error(`Ошибка при ${stage}:`, error.message);
}