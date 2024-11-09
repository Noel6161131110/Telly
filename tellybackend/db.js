import mongoose from "mongoose";
import 'dotenv/config';

// * Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{
            console.log("Connected to DB")
        })
        .catch((err)=>{
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
};

// ? Export the connectDB function
export default connectDB;