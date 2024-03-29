import jwt from "jsonwebtoken"
import User from "../../models/appModels/user.models.js"

const mumbaiGMT = 5.5*60*60*1000

export const index = async (req,res)=>{
    return res.render("index.html")
}

export const login = async (req,res)=>{

    const { username,password } = req.body
    
    if(!username || !password ){
        return res.json({
            "success":false,
            "error":false,
            "message":"Invalid Credentials"
        }).status(401)
    }

    const user = await User.findOne({$or:[{username},{email:username}]}).exec()

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
        id:user._id,
        userId:user.email,
        userAgent:req.headers['user-agent']
    }

    const currentTime = Math.floor((new Date().getTime() + mumbaiGMT)/1000)

    refreshToken = jwt.sign(payload,process.env.JWT_SECRET,
    {
        expiresIn : currentTime + 2*60*60 // 2h
    })

    const accessToken = jwt.sign(payload,process.env.JWT_SECRET,
    {
        expiresIn : currentTime + 15*60 // 15m
    })

    user.refreshToken = refreshToken

    await user.save()

    return res.json({
        "success":true,
        "error":false,
        "message":"Logged in successfully",
        refreshExpiry : Number(process.env.REFRESH_TOKEN_EXPIRY),
        accessToken,
        refreshToken
    })
}

export const register = async (req,res)=>{
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

export const refreshToken = async (req,res)=>{
    const { refreshToken } = req.query

    // here I don't have to check if user refresh token is expired in database also because if he tries to login then 
    // it will automatically check if refresh token expires or not if not then it will generate new access token and refresh token
    // here I Just have to check if refresh token is valid or not if yes then return new access token and refresh token
    try{
        const { userAgent,userId } = jwt.verify(refreshToken,process.env.JWT_SECRET)

        if(!userId || !userAgent || userAgent !== req.headers['user-agent']){
            return res.status(403).json({
                "success":false,
                "error":false,
                "message":"token or request is invalid"
            })
        }
    
        const user = await User.findOne({email:userId}).exec()
    
        if(!user || user.get("refreshToken")!==refreshToken){
            return res.status(404).json({
                "success":false,
                "error":false,
                "message":"user not found"
            })
        }

        const payload = {
            id:user._id,
            userId:user.email,
            userAgent:req.headers['user-agent']
        }
        
        const currentTime = Math.floor((new Date().getTime() + mumbaiGMT)/1000)
    
        const newrefreshToken = jwt.sign(payload,process.env.JWT_SECRET,
        {
            expiresIn : currentTime + 2*60*60 // 2h
        })

        const accessToken = jwt.sign(payload,process.env.JWT_SECRET,
        {
            expiresIn : currentTime + 15*60 // 15m
        })

        user.refreshToken = newrefreshToken

        await user.save()

        return res.json({
            "success":true,
            "error":false,
            "message":"Logged in successfully",
            refreshExpiry : Number(process.env.REFRESH_TOKEN_EXPIRY),
            accessToken,
            refreshToken:newrefreshToken
        })

    }catch(err){
        return res.status(403).json({
            "success":false,
            "error":false,
            "message":"token is invalid or expired"
        })
    }

}