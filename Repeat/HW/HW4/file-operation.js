const fs = require('fs')
const dotenv = require('dotenv/config')

const fileName = process.env.FILENAME

fs.writeFile(fileName, 'Hi from Sergii!!!', 'utf-8', (err) => {
    if (err) {
        return console.error('Error occured writing file: ', err.message)
    }
    console.log('File was created');
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
        return console.error('Error occured reading file: ', err.message)
    }
    console.log('File contents: ', data);
    })
})