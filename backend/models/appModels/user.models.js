const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:[true,'Password is Required']
        
        
    },
    avatar:{
        type:String,


    },
    refreshToken:{
        type:String,
        
    },
},{timestamps:true})

// userSchema.pre("")

export const User=mongoose.model("User",userSchema)