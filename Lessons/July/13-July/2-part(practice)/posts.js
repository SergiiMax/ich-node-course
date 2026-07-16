import fs from 'fs'
import axios from 'axios'

axios.get(`https://jsonplaceholder.typicode.com/posts`)
.then(response => {
    fs.writeFile('posts.txt', JSON.stringify(response.data), (err) => {
        if(err) {
            console.error("Error occured writing file: ", err)
            return
        }

        fs.readFile('posts.txt', 'utf-8', (data, err) => {
            if(err) {
            console.error("Error occured reading file: ", err)
            return
        }
        })
    })
})
.catch(error => {
    console.error('Error fatching data: ', error)
})

