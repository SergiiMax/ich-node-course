const fs = require('fs')
const path = require('path')

const folderPath = path.join(__dirname, 'myFolder')

fs.mkdir(folderPath, {recursive: true}, (err) => {
    if (err) {
        console.error('Error occurred creating directory: ', err.message)
        return
    }
    console.log('Directory was successfully created');

    fs.rmdir(folderPath, (err) => {
    if (err) {
        console.error('Error occurred deleting directory: ', err.message)
        return
    }
    console.log('Directory was successfully deleted');
})
})



const absolutePath = path.resolve('test')
console.log('Path to test folder: ', absolutePath);