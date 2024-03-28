import app from "./app.js"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
dotenv.config()


const PORT = process.env.PORT || 8000

ConnectDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log("Server running on port " + PORT)
    })
})
.catch((error)=>
{
    console.log("DataBase connection Failed",err)
})
