const mongoose=require("mongoose");
const MONGODB_SALT_ROUNDS = 10
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:[true,'Password is Required'],
        bcrypt:true
    },
    refreshToken:{
        type:String,
        
    }
},{timestamps:true})


userSchema.pre("save",async function(next){
    const user = this;

    if(!user.isModified("password")){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(MONGODB_SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(user.password,salt);
     
        user.password = hashedPassword
        next();
    }catch(err){
        next(err);
    }
  

})

userSchema.methods.comparePassword = async function(candidatePassword){

    try{
        return await bcrypt.compare(candidatePassword,this.password)
    }catch(err){
        throw err;
    }
    
}



module.exports.User = mongoose.model("User",userSchema)