import mongoose from "mongoose"
import User from "../appModels/user.models.js"

const FriendSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: User,
        required : true
    },
    firstname:{
        type:String,
        required: [true,"this field is required"],
        lowercase:true
    },
    lastname : {
        type:String,
        required: [true,"this field is required"],
        lowercase: true,
    }
})


const Friends = mongoose.model("Friends",FriendSchema)

export default Friends;