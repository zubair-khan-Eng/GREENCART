import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in environment variables");
        }
        mongoose.connection.on("connected", () => console.log("Database Connected"));
        const mongoUri = `${process.env.MONGODB_URI.replace(/\/+$/, "")}/greencart`;
        await mongoose.connect(mongoUri);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;