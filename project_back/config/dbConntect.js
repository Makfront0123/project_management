import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Connected to MongoDB",mongoose.connection.name);
    } catch (error) {
        console.log(error);
    }
};