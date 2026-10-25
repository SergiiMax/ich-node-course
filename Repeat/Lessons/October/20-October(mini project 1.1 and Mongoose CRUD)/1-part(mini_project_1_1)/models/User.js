import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: [true, "Username must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [true, "Min length must be not less then 6 characters"],
    },
  },
  { timestamps: true,
    versionKey: false
   },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12); // хэшируем если пароль новый или изменён
});

const User = mongoose.model("User", userSchema);

export default User;
