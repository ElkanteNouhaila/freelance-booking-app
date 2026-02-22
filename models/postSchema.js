import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    legend:{
        type:String,
        required: true
    },
    
})