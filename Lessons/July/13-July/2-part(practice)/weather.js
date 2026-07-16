import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const CITY = process.env.CITY

axios.get(`https://wttr.in/${CITY}?format=%t`)
.then(response => {
    console.log(`Temperature in ${CITY} is: `, response.data);
})
.catch(error => {
    console.error('Error fatching data: ', error)
})