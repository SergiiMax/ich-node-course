import "dotenv/config";
import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.error("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}
export default connectionDB;