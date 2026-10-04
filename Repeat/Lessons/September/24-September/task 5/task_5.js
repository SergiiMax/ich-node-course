const fs = require("fs");
// const { pipeline } = require("stream/promises"); // pipeline с промисами – это удобно для await

const readStream = fs.createReadStream("input.txt", "utf-8");
const writeStream = fs.createWriteStream("output.txt", "utf-8");

// Соединяем потоки

readStream.pipe(writeStream)

writeStream.on('finish', () => {
    console.log("File was succesfully copied");
})

writeStream.on('error', (err) => {
    console.error('Error occured writing file: ', err.message)
})

readStream.on('error', (err) => {
    console.error('Error occured reading file: ', err.message)
})

// pipeline сам соединяет потоки, учитывает backpressure и закрывает их в конце
// await pipeline(readStream, writeStream);