import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
