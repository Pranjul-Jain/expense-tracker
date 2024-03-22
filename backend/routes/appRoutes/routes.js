const express = require("express")
const router = express.Router()

const { index,login } = require("../../controllers/appControllers/mainController")
const { verifyToken } = require("../../middlewares/appMiddlewares/verifyToken")

router.route("/").get(index)
router.route("/user-login").post(login)

module.exports = router