import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import {fs} from "fs"
configDotenv()

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// file upload process

const uploadOnCloudinary = async(localFilePath) =>{
    try {
        
    } catch (error) {
        
    }
}