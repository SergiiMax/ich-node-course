import fs from 'fs'

const readStream = fs.createReadStream('nodejs.png')
const writeStream = fs.createWriteStream('destinationFile.png')

readStream.on('error', (err) => {
    console.error("Error occured reading file: ", err)
})

writeStream.on('error', (err) => {
    console.error("Error occured writing file: ", err)
})

readStream.pipe(writeStream)

writeStream.on('finish', () => {
    console.log('Writing was successfully completed');
})