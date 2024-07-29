import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,     
    },
    watchHistory:[
       {
        type: Schema.Types.ObjectId,
        ref:"Video"
       }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
       type:String
    }

},{timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

export const User = mongoose.model("User", userSchema)