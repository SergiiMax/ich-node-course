const fs = require('fs')

const writeStream = fs.createWriteStream('input2.txt', 'utf-8')

writeStream.write("Запись через поток в Node.js\n")
writeStream.write("Запись через поток в Node.js\n")
writeStream.write("Запись через поток в Node.js\n")
// writeStream.end("End of writing")

writeStream.on('error', (err) => {
    console.error("Error during writing: ", err)
})

writeStream.on('finish', () => {
    console.log("Finish writing file")
})