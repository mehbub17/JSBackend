import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({

    username: {
        type:String,
        required: true,
        unique: true,
        lowercase :true,
        trim: true,
        index: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase :true,
        trim: true,
    },
    fullname: {
        type:String,
        required: true,
        trim: true,
        index: true // for fast searching but costly
    },
    avatar: {
        type: String, //cloudinary
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    refreshToken: {
        type: String
    }



},{timestamps: true})


userSchema.pre("save",async function(next){
    
    if(!this.isModified("password"))
    {
        next();// not modified then skip
    }

    this.password = bcrypt.hash(this.password,10)
    next();

})


// plugging methods in userSchema
userSchema.methods.isPasswordCorrect = async function(password)
{
   return await bcrypt.compare(password,this.password) // returns true or false
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },//payload
        process.env.ACCESS_TOKEN_SECRET, //access token secret
        {

            expiresIn :  process.env.ACCESS_TOKEN_EXPIRY
        }// expiry in object
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id,
        },//payload
        process.env.REFRESH_TOKEN_SECRET, //access token secret
        {

            expiresIn :  process.env.REFRESH_TOKEN_EXPIRY
        }// expiry in object
    )

}



export const User = mongoose.model("User",userSchema);