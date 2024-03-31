import mongoose from "mongoose"

const SingleExpenseSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date: {
        type: Date,
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
        required:true,
        lowercase: true
    }
})

const GroupExpenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date: {
        type:Date,
        required:true
    },
    groupExpenses:[
        {
            person:{
                type:String,
                required:true
            },
            amount:{
                type:Number,
                default: 0,
            },
            comment:{
                type:String,
                required:true,
                lowercase: true
            },
            location:{
                type:String,
                required:true,
                lowercase: true
            }
        }
    ]
})


export const SingleExpense= mongoose.model("SingleExpense",SingleExpenseSchema)
export const GroupExpense = mongoose.model("GroupExpense",GroupExpenseSchema)