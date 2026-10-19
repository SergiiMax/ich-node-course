import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "Name is required"],
    minLength: [3, "The name must contain at least 3 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lewercase: true, // приводит к нижнему регистру
    match: [/^\S+@\S+\.\S+$/, "Invalid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "The password must contain at least six characters."],
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

export default User;
