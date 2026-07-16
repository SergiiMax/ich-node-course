const fs = require('fs')

const content = 'Node.js is awesome!'

fs.writeFile('info.txt', content, (err) => {
    if(err) {
        console.error('Error occured writing file: ', err)
        return
    }
    fs.readFile('info.txt', 'utf-8', (err, data) => {
    if(err) {
        console.error('Error occured reading file: ', err)
        return
    }
    console.log('File content: ', data);
})
})

// ИЛИ С ПОМОЩЬЮ ПОТОКОВ ===============================================================================================================

const writeStream = fs.createWriteStream('info.txt', 'utf-8')


writeStream.write('Node.js is awesome!\n')
writeStream.end()

writeStream.on('error', (err) => {
    if(err) {
        console.error('Erroc occured writing file: ', err)
        return
    }
})

writeStream.on('finish', () => {
    console.log('Content was created!!!');

    const readStream = fs.createReadStream('info.txt', 'utf-8')

    readStream.on('data', (chunk) => {
        console.log("File content: ", chunk);
    })

    readStream.on('error', (err) => {
        console.error('Erroc occured reading file: ', err)
        return
    })
})