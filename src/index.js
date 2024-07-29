import connectDB from "./db/index.js";

connectDB()
.then()
.catch((err) =>{
    console.log('Error from mongoDB connection!!', err);
})