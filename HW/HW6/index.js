import express, { urlencoded } from 'express'
import 'dotenv/config'
import connection from './db.js'

const app = express()

app.use(express.json())
app.use(urlencoded())

const PORT = process.env.PORT || 3000

app.get('/', (_req, res, next) => {
    try {
        res.json({ message: "Hello World!" })
    } catch (error) {
        next(error)
    }
})

app.post('/', (req, res) => {
    const { name, age } = req.body
    if (!name && !age) {
        res.status(400)
        res.json({ message: "Name and Age are required!" })
        return
    }
    res.json({ message:"Data recieved", data: { name:name, age: age } })
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

app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` })
})

app.use((error, _req, res, _next) => {
    const status = error.status || 500
    
    if (status === 500) {
        console.error(error.status)
    }

    res.status(status). json({ message: status === 500 ? "Internal  Server Error" : error.message })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})