import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "Name is required"],
    trim: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
