import mongoose from "mongoose";

const authorSchema = await new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "Name is required"],
    trim: true,
  },
  bio: {
    type: String,
    maxLength: [2000, "BIO must contain not more then 2000 characters"],
    default: "",
  },
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
