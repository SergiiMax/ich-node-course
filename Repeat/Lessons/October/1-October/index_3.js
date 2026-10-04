import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Anna' },
    { id: 3, name: 'Peter' },
]

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (_req, res) => {
    res.send('List of users');
});

app.get('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    if(!userId){
        return next(createError(400, 'User id is required!'));
    }
    const user = users
});