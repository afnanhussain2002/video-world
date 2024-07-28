import mongoose from "mongoose";
import dotenv from "dotenv"
import { DB_NAME } from "../constants.js";
dotenv.config()


const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`connected with database! DB HOST: ${connect.connection.host}`);
    } catch (error) {
        console.log('mongoDB error', error);
        process.exit(1)
    }
}

export default connectDB;