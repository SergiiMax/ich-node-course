import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of Publisher is required"],
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    default: "",
  },
});

const Publisher = mongoose.model("Publisher", publisherSchema);

export default Publisher;
