import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const response = await axios.post(`http://localhost:${PORT}/submit`, {
    username: 'Alexander',
    email: 'example@test.com'
});

console.log(response.data);
