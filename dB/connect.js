import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDb = async () => {
    try {
        const contc = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.log(`Error : ${error.message}`);
    }
}

export default connectDb