const jwt = require("jsonwebtoken")
const { User } = require("../../models/appModels/user.models")

module.exports.index = async (req,res)=>{
    return res.render("index.html")
}

module.exports.login = async (req,res)=>{

    const { username,password } = req.body
    
    if(!username || !password ){
        return res.json({
            "success":false,
            "error":false,
            "message":"Invalid Credentials"
        }).status(401)
    }

    const user = await User.findOne({username,email:username})

    if(!user){
        return res.status(404).json({
            "success":false,
            "error":false,
            "message":"User not found"
        })
    }

    if(!await user.comparePassword(password)){
        return res.status(401).json({
            "success":false,
            "error":false,
            "message":"Password does not match"
        })
    }

    let refreshToken = user.get("refreshToken")

    try{
        jwt.verify(refreshToken,process.env.JWT_SECRET)
        return res.status(403).json({
            "success":false,
            "error":false,
            "message":"user already logged in"
        })
    }catch(err){
       // refresh token is expired then user is logged out  
    }
    
    const payload = {
        userId:user.email,
        userAgent:req.headers['user-agent']
    }
    
    refreshToken = jwt.sign(payload,process.env.JWT_SECRET,
    {
        expiresIn : "2h"
    })

    const accessToken = jwt.sign(payload,process.env.JWT_SECRET,
    {
        expiresIn : "15m"
    })

    user.refreshToken = refreshToken

    await user.save()

    return res.json({
        "success":true,
        "error":false,
        "message":"Logged in successfully",
        accessToken,
        refreshToken
    })
}

module.exports.register = async (req,res)=>{
    const { username,email,password } = req.body

    if(!username || !email || !password){
        return res.status(401).json({
            "success":false,
            "error":false,
            "message":"Invalid Credentials"
        })
    }

    const user = await User.findOne({$or:[{email:username},{username}]})

    if(user){
        return res.status(409).json({
            sucess:false,
            error:false,
            message:"user already exists"
        })
    }

    const newUser = new User({
        username:username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        refreshToken:null
    })

    newUser.save()

    return res.json({
        "success":true,
        "error":false,
        "message":"user created successfully"
    })
}