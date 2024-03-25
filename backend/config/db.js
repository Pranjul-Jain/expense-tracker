const mongoose = require("mongoose")
const DB_NAME=require("../constants")




const ConnectDB= async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MONGODB CONNECTED !!! DB HOST :${connectionInstance.connection.host}`);   

    } catch (error) {
        console.log("MONGODB CONNECTION ERROR",error);
        process.exit(1);
    }

}

module.exports=ConnectDB