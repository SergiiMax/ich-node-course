const axios = require('axios')

axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(result => {
        console.log(result.data);
    })
    .catch(err => {
        console.error('Network request error: ', err.message)
    })