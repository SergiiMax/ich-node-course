const axios = require('axios')
const dotenv = require('dotenv/config')


const city = process.env.CITY

axios.get(`https://wttr.in/${city}?format=%t`)
.then(result => {
    console.log(`Weather in ${city}: ${result.data}`);
})
.catch(error => {
    console.error('Network error: ', error.message)
})

const cities = process.env.CITIES
    .split(',')
    .map(city => city.trim())

cities.map(city => {
    axios.get(`https://wttr.in/${city}?format=%t`)
        .then(result => {
            console.log(`Weather in ${city}: ${result.data}`)
        })
        .catch(error => {
            console.error(`Network error for ${city}:`, error.message)
        })
})