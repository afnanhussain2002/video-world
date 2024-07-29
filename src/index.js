import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(() =>{
    app.on('error',(error) =>{
        console.log('Error from express', error);
    })
    
})
.catch((err) =>{
    console.log('Error from mongoDB connection!!', err);
})