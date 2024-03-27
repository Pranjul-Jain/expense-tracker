module.exports.verifyRequest = (req,res,next)=>{

    if(req.userAgent != req.headers['user-agent']){
        return res.status(401).json({
            success:false,
            error: false,
            message:"invalid request"
        })
    }

    next()
}