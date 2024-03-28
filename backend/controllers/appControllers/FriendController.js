import Friends from "../../models/appModels/Friend.models.js";
import User from "../../models/appModels/user.models.js";

export const addFriend = async (req,res)=>{

    if(!req.userId || !req.userAgent){
        return res.status(401).json({
            success: false,
            error: false,
            messsage: "Unauthorized User"
        })
    }

    const { firstname, lastname } = req.body;

    const friend = await Friends.findOne({firstname,lastname})

    if(friend){
        return res.status(409).json({
            success: false,
            error: false,
            messsage: "user already exists"
        })
    }

    const newFriend = new Friends({
        firstname,
        lastname
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

    const friends =await Friends.find({})
    
    return res.status(200).json({
        success: true,
        error: false,
        message: "User created successfully",
        friends
    })
}