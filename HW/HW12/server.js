import express from "express"
import "dotenv/config"
import { connectDB } from "./config/connection.js"
import Product from "./models/Product.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/products', async (req, res) => {
    try {
        const { name, price, description } = req.body
        const product = new Product({ name, price, description })
        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
})

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error occurred getting products from database", details: error.message })
    }
})

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({message: "Product was not find"})
    }
    res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: "Error occurred getting product from database", details: error.message })
    }
})

app.put("/products/:id", async (req, res) => {
    try {
        const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body,{ new: true, runValidators: true })
    if (!product) {
        return res.status(404).json({message: "Product was not find"})
    }
    res.status(200).json({ message: "Updated", product })
    } catch (error) {
        res.status(500).json({ error: "Error occurred", details: error.message })
    }
})

app.delete("/products/:id", async (req, res) => {
    try {
        const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
        return res.status(404).json({message: "Product was not find"})
    }
    res.status(200).json({ message: "Deleted", product })
    } catch (error) {
        res.status(500).json({ error: "Error occurred", details: error.message })
    }
})

const start = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server is listeninp on port ${port}`);
        })
    } catch (error) {
        console.error("Failed to start server", error.message)
    }
}

start()