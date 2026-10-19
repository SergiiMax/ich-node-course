import mongoose from "mongoose";

const magazineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  issueNumber: {
    type: Number,
    required: [true, "Issue Number is required"],
    min: [1, "Issue number must be positive"]
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
    required: [true, "Magazine must have a Publisher"],
    index: true,
  },
}, { timestamps: true });

magazineSchema.index({ publisher: 1, issueNumber: 1 }, { unique: true });

const Magazine = mongoose.model("Magazine", magazineSchema);

export default Magazine;
