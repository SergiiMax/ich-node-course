import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const PORT = process.env.PORT || 3000;


// async function test() {
try {
    const response1 = await axios.post(`http://localhost:${PORT}/submit`);
    console.log('/submit:', response1.data);

    // const response2 = await axios.post(`http://localhost:${PORT}/submitNotRoute`);
    // console.log('/submitNotRoute:', response2.status);

    await axios.delete(`http://localhost:${PORT}/submitNotRoute/5`);
} catch (error) {
    console.log(error.response.data);
    console.log(error.status);
}
// }


// test();