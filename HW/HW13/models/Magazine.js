import mongoose from "mongoose";

const magazineSchema = new mongoose.Schema({
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
  },
  title: {
    type: String,
    required: true,
  },
  issueNumber: {
    type: Number,
    required: true,
  },
});

const Magazine = mongoose.model("Magazine", magazineSchema);

export default Magazine;
