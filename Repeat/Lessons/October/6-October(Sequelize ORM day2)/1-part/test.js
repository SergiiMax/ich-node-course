import axios from 'axios'
import 'dotenv/config'

const PORT = process.env.PORT || 3000
const URL_BASE = `http://localhost:${PORT}`



async function createNewUser (newUser) {
    try {
        const response = await axios.post(`${URL_BASE}/users`, newUser)
        console.log('New user was created: ', response.data);
    } catch (error) {
        console.error("Error occurred creating new User: ", error.message)
    }
}

createNewUser({
    name: "Serg",
    email: "example2@test.com",
})