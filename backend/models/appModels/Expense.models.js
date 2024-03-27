const mongoose=require("mongoose");

const ExpenseSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        default:0,


    },
    location:{
        type:String,
        required:true,
        lowercase:true,

    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})


const Expense=mongoose.model("Expense",ExpenseSchema)