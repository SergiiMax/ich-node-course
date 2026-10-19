import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "Name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, 'Price must be more then 0'],
    max: [1000000, 'Price must be not more then 1000000']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, 'Category is required'],
    index: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
