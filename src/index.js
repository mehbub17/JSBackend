import dotenv from "dotenv"

import mongoose, { connect } from "mongoose";
import express from "express"
import connectDB from "./db/index.js";

const app = express()

dotenv.config({
    path: './env'
})





connectDB()













//iife  --> first approach or call function 
// (
//     async()=>{
//         try {

//            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//            app.on("error",(error)=>{
//             console.error("Error: ",error)
//             throw error

//            })

//            app.listen(process.env.PORT,()=>{
//             console.log(`App  is listening on port ${process.env.PROT}`)
//            })


//         } catch (error) {

//             console.error("Error: ",error)
//             throw error
            
//         }
//     }
// )()