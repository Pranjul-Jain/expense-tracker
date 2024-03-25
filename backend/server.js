const app = require("./app")
const dotenv = require("dotenv")
const ConnectDB=require("./config/db")
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
