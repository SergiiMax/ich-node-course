import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minLength: [3, "Title must be at least 3 characters"],
    maxLength: [150, "Title must be at most 150 characters"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    minLength: [10, "Content must be at least 10 characters"],
    maxLength: [10000, "Content must be at most 10000 characters"],
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
