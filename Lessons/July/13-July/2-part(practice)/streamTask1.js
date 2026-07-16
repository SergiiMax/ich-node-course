import fs from 'fs'

const readStream = fs.createReadStream('largeFile.txt', 'utf-8')

readStream.on('data', (chunk) => {
    console.log('Chunk was recieved', chunk);
})

readStream.on('end', () => {
    console.log('End of reading file largeFile.txt');
})

readStream.on('error', (err) => {
    console.error('Error occured reading file: ', err)
})