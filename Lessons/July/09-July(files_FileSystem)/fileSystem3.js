const fs = require('fs')

const readStream = fs.createReadStream('input.txt', 'utf-8')

readStream.on('data', (chunk) => {
    console.log('Chunk was recieved: ', chunk);
})

readStream.on('end', () => {
    console.log('End of reading');
})

readStream.on('error', (err) => {
    console.error('Error occured reading file: ', err)
})