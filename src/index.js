import { app } from "./app.js";
import connectDB from "./db/index.js";
import { configDotenv } from "dotenv";
configDotenv()

const port = process.env.PORT || 8000
console.log(port);

connectDB()
.then(() =>{
    app.on('error',(error) =>{
        console.log('Error from express', error);
    })
    
})
.catch((err) =>{
    console.log('Error from mongoDB connection!!', err);
})