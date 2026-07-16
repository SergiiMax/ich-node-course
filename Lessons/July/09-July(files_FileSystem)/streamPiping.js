const fs = require('fs')

const readStream = fs.createReadStream('input3.txt', 'utf-8')
const writeStream = fs.createWriteStream('output2.txt', 'utf-8')

readStream.on('error', (err) => {
    console.error('Error: ', err)
})

writeStream.on('error', (err) => {
    console.error('Error: ', err)
})

readStream.pipe(writeStream)

writeStream.on('finish', () => {
    console.log('Success');
})