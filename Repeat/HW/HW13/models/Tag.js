import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tag is required"],
    lowercase: true,
    unique: true,
    trim: true,
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
