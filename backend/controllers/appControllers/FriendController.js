import Friends from "../../models/appModels/Friend.models.js";
import User from "../../models/appModels/user.models.js";
import mongoose from "mongoose"

export const addFriend = async (req,res)=>{

    if(!req.userId || !req.userAgent){
        return res.status(401).json({
            success: false,
            error: false,
            messsage: "Unauthorized User"
        })
    }

    const { firstname, lastname } = req.body;
    if(!firstname || !lastname || typeof firstname !== "string" || typeof lastname !== "string"){
        return res.status(400).json({
            success: false,
            error: false,
            messsage: "All fields are mandatory"
        })
    }

    const user = await User.findOne({email:req.userId},{_id:1})

    const friend = await Friends.findOne({userId:user._id,firstname:firstname.toLowerCase(),lastname:lastname.toLowerCase()})

    if(friend){
        return res.status(409).json({
            success: false,
            error: false,
            messsage: "user already exists"
        })
    }

    const newFriend = new Friends({
        userId : user._id,
        firstname:firstname.toLowerCase(),
        lastname:lastname.toLowerCase()
    })

    await newFriend.save()

    return res.status(200).json({
        success: true,
        error: false,
        message: "User created successfully"
    });
}

export const getFriend = async(req,res)=>{

    if(!req.userId || !req.userAgent){
        return res.status(401).json({
            success: false,
            error: false,
            messsage: "Unauthorized User"
        })
    }

    const user = await User.findOne({email:"pranjuljainp@gmail.com"},{_id:1,username:1})

    const friends = await Friends.find({userId:user._id},{firstname:1,lastname:1,_id:0})
    
    // pushing main user username to the result array
    friends.push({
        firstname:user.username
    })

    return res.status(200).json({
        success: true,
        error: false,
        message: "User created successfully",
        data : friends
    })
}