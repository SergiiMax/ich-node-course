const fs = require('fs')

// try {
//     const data = fs.readFileSync('example.tst', 'utf-8')
//     console.log(data)       
//     } catch (err) {
//         console.error(err)
// }

const readStream = fs.createReadStream('example.txt', 'utf-8')

readStream.on('data', (chunk) => {
    console.log('Chunk was recieved: ', chunk);
})

readStream.on('end', () => {
    console.log('End of reading file');
})

readStream.on('error', (err) => {
    console.error('Error occured reading file: ', err)
})