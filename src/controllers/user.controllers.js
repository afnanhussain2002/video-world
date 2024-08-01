import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async(req,res)=>{
    // It was just for test everything working or not
    /* res.status(200).json({
        message:"Everything is fine"
    }) */

        // steps for register a user

        // get user form frontend i mean postman

      const {fullName, username, email, password} = req.body;
      console.log("email", email);
      // validation - check empty 
      if ([fullName, username,email,password].some(field => field.trim() ==="")) {
        throw ApiError(400, "All fields are required")
      }
       // check if the user already exists: Using username, email
       const existUser = User.findOne({
        $or: [{username}, {email}]
       }) 
       if (existUser) {
        throw ApiError(409, "email or username already exists")
       }
       // check for images, check for avatar
       const avatarLocalPath = req.files?.avatar[0]?.path;
       const coverImageLocalPath = req.files?.coverImage[0]?.path;
       // upload them to cloudinary, avatar
       // create user object - create entry in db
       // remove password and refresh token field form response
         // check for user creation
         // return user


})

export {registerUser}