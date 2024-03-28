import mongoose from "mongoose"
import bcrypt from "bcrypt"

const MONGODB_SALT_ROUNDS = 10

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

userSchema.methods.comparePassword = function (candidatePassword){ 
    return bcrypt.compare(candidatePassword,this.password)
}


const User =  mongoose.model("User",userSchema)
export default User;