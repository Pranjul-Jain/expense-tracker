const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
const cookieParser =require("cookie-parser")

const routes = require("./routes/appRoutes/routes")

// Adding Basic Configurations
app.use(cors({
    origin:process.env.CORS_URL,
    credentials:true,

}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({ 
    extended: true,
    limit:"16kb"
 }))

// Adding Static Files
app.use(express.static(path.join(__dirname,"../moneyTrackerFrontend/dist")))

// cookies
app.use(cookieParser())


// Importing Routes
app.use("",routes)


module.exports = app