const jwt = require("jsonwebtoken")

module.exports.verifyToken = (req,res,next)=>{

    if(!req.headers.Authorization){
        return res.json({
            success:false,
            message:"No token provided"
        }).status(401)
    }
    
    const [tokenType,token] = req.headers.Authorization.split(" ")

    if(tokenType !== "Bearer" || !token){
        return res.json({
            success:false,
            message:"Invalid token"
        }).status(401)
    }

    const tokenData = jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.json({
                success:false,
                message:"Invalid token"
            }).status(401)
        }

        return decoded
    })

    if(tokenData["user-agent"]!=req.headers['user-agent']){
        return res.json({
            success:false,
            message:"Invalid token"
        }).status(401)
    }

    req.userId = tokenData.userId

    next()
}