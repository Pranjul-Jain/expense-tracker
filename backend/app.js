import express from "express"
import cors from "cors"

const app = express()

import routes from "./routes/appRoutes/routes.js"

// Adding Basic Configurations
app.use(cors({
    origin:"*",
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
app.use(express.static("../moneyTrackerFrontend/dist"))


// Importing Routes
app.use("",routes)


export default app