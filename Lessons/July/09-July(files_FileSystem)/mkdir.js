// const path = require('path')

// const absolutePath = path.resolve('simpleFolder22')

// // console.log('The path is: ', absolutePath);
// const newPath = path.join(__dirname, 'example3.txt')
// console.log(__dirname);

const fs = require('fs')
const path = require('path')
const folderPath = path.join(__dirname, 'Test')
const filePath = path.join(folderPath, 'example.txt')

fs.mkdir(folderPath, (err) => {
    if(err) {
        console.error('Error occured creating directory: ', err)
        return
    }
    console.log('Directory was successfully created');
    
})