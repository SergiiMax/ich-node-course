const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'info.txt')
const content = 'Node.js is awesome!\n'

fs.writeFile(filePath, content, 'utf-8', (err) => {
    if (err) {
        console.error('Error occurred writing file: ', err.message)
        return
    }
    console.log('File was successfully written');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error occurred reading file: ', err.message)
            return
        }
        console.log('File was successfully read. File contents: ', data);
    })
})

// ИЛИ С ПОМОЩЬЮ ПОТОКОВ ===============================================================================================================

// const writeStream = fs.createWriteStream('info2.txt', 'utf-8')
// const readStream = fs.createReadStream('info2.txt', 'utf-8')

// writeStream.write(content)
// writeStream.end()

// writeStream.on('error', (err) => {
//         console.error('Error occured writing file: ', err.message)
// })

// writeStream.on('finish', () => {
//         console.log('Content was created')

//         readStream.on('data', (chunk) => {
//             console.log('File contents: ', chunk);
//         })

//         readStream.on('error', (err) => {
//             console.error('Error occurred readinf file: ', err.message)
//         })
// })