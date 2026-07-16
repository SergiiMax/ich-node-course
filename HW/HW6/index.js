import express from 'express'
import 'dotenv/config'
import connection from './db.js'

const PORT = process.env.PORT
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "Hello, World!"})
})

app.post('/', (req, res) => {
    const { name, age } = req.body
    if (!name || !age) {
        res.status(400).json({ error: "Invalid data" })
        return
    }
    res.json({ message: "Recieved data", data: { name: name, age: age}})
})

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products'

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products: ', err.stack)
            res.status(500).send('Error fetching products')
            return
        }
        res.json(results)
    })
})

app.post('/products', (req, res) => {
    const { name, price } = req.body
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)'

    if (!name || !price) {
        res.status(400).send("Invalid data")
        return
    }

    if(isNaN(price)) {
        res.status(400).send("Price must be a number")
        return
    }

    connection.query(query, [name, price], (err, results) => {
        if (err) {
            console.error("Error adding product: ", err.stack)
            res.status(500).send("Error adding product")
            return
        }
        res.status(201).send('Product added successfully')
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
  message: "Internal Server Error",
  error: err.message
}
)
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})