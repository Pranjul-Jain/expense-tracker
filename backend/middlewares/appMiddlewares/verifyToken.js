import jwt from "jsonwebtoken"
import User from "../../models/appModels/user.models.js"

export const verifyToken = async (req,res,next)=>{

    if(!req.headers.authorization || !req.headers['user-agent']){
        return res.status(401).json({
            success:false,
            message:"invalid request"
        })
    }
    
    const authorization = req.headers.authorization

    const [tokenType,token] = authorization.split(" ")

    if(tokenType.toUpperCase() !== "BEARER" || !token){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }

    try{

        let tokenData = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({email:tokenData.userId})
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
        // if token is expired or refresh token is not there that means user is logged out
    }
    
    next()
}