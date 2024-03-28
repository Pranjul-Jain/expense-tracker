import jwt from "jsonwebtoken"
import User from "../../models/appModels/user.models.js"

export const verifyToken = async (req,res,next)=>{

    if(!req.headers.Authorization || !req.headers['user-agent']){
        return res.status(401).json({
            success:false,
            message:"invalid request"
        })
    }
    
    const [tokenType,token] = req.headers.Authorization.split(" ")

    if(tokenType.toUpperCase() !== "BEARER" || !token){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }

    try{

        let tokenData = jwt.verify(token,process.env.JWT_SECRET)

        const user = user.findOne({$or:[{email:tokenData.userId},{username:tokenData.userId}]})
        // if user exists then token is valid
        if(!user){
            return res.status(401).json({
                success:false,
                error:false,
                message:"Invalid token"
            })
        }

        req.userId = tokenData.userId
        req.userAgent = tokenData.userAgent

    }catch(err){
        // if token is expired or refresh token is not there that means user is logged    
    }
    
    next()
}