import Product from '../models/Product.js';
export async function createProduct(req, res, next) {
  try {
    const { name, price, category } = req.body ?? { };
    if (!name.trim() || typeof name !== 'string') {
      return res.status(400).json({
        message: 'Name is required and must be type of string',
      });
    }
    if (
      !price ||
      typeof price !== 'number' ||
      price < 0 ||
      !Number.isFinite(price)
    ) {
      return res.status(400).json({
        message: 'Priсe is required and must be positive number',
      });
    }
    if (!category.trim() || typeof category !== 'string') {
      return res.status(400).json({
        message: 'Category is required and must be type of string',
      });
    }
    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error occurred creating Product', error.message);
  }
}

export async function getAllProducts(req, res, next) {
  try {
    const {category, sort, minPrice, maxPrice} = req.query ?? {}
    const filter = {}  // литерал
    if(category){
        filter.category = String(category).trim()  // явно к строке
    }
    if(minPrice !==undefined || maxPrice !==undefined){
        filter.price = {};
        if(minPrice !== undefined){
            filter.price.$gte = Number(minPrice)
        }
         if(maxPrice !== undefined){
            filter.price.$lte = Number(maxPrice)
        }
    }
    let query = Product.find(filter)
    if(sort === 'asc' || sort === 'desc'){
        query = query.sort({price: sort === 'asc' ? 1 : -1})
    } 
    
    const products = await query;  // почему стоит await?
    res.json({
        products,
        count: products.length
    });
  } catch (error) {
    console.error(error.message);
  }
}