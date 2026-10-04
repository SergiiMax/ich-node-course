const fs = require('fs')

const writeStream = fs.createWriteStream('output.txt', 'utf-8')

writeStream.on('finish', () => {
    console.log('Writing is completed');
})

writeStream.on('error', (err) => {
    console.error('Error occured writing file', err.message)
})

for(let i = 0; i <= 5; i++) {
    writeStream.write(`${i+1} record. Stream recording in Node.js\n`)
}

writeStream.end('Last string\n');