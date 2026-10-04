const fs = require('fs')

const readStrem = fs.createReadStream('image.jpeg')
const writeStream = fs.createWriteStream('destinationFile.jpg')
readStrem.pipe(writeStream)

readStrem.on('error', (err) => {
    console.error('Error occured reading file: ', err.message)
})

writeStream.on('finish', () => {
    console.log('File was successfully written');
})

writeStream.on('error', (err) => {
    console.error('Error occured writing file: ', err.message)
})