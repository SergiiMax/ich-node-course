import Product from "../models/Product.js"

export async function addItem(req, res, next) {
    try {
        const { name, quantity, price } = req.body ?? {}

    if (!name.trim() || typeof name !== 'string') {
        return res.status(400).json({
            message: "Name is required and must be not empty string"
        })
    }

    if (!quantity || !Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            message: "Quantity is required and must be number > 0 "
        })
    }

    if (!price || typeof price !== 'number' || price < 0) {
        return res.status(400).json({
            message: "Price is required and must be number > 0"
        })
    }

    const cleanName = name.trim()

    const existingProduct = await Product.findOne({ name: cleanName, price })

    if (existingProduct) {
        existingProduct.quantity += quantity

        await existingProduct.save()
        return res.json({
            message: "Product already exists, it's quantity was increased"
        })
    }
    
    } catch (error) {
        next(error)
    }
}