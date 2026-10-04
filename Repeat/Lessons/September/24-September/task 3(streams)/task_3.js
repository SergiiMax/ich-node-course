const fs = require("fs");

const readStream = fs.createReadStream("input3.txt", {
  encoding: "utf8",
  // highWaterMark определяет размер одного куска (chunk) в байтах (по умолчанию 64КБ)
  highWaterMark: 1024, //байты (1КБ) , default: 64KB
});

let chunkCount = 0; // считаем чанки(сколько кусков пришло)

readStream.on('data', (chunk) => {
    chunkCount++;
    console.log(`--- Chunk №${chunkCount} symbols: (${chunk.length}) ---`);
    console.log(chunk);
})

readStream.on('end', () => {
    console.log(`Reading of the file completed! Total chunks: ${chunkCount}`);
})

readStream.on('error', (err) => {
    console.error('Error occured reading a file', err.message)
})