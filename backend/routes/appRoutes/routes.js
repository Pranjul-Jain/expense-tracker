import express from "express"
const router = express.Router()

import { index,login,register,refreshToken } from "../../controllers/appControllers/mainController.js"
import { verifyToken,verifyRequest } from "../../middlewares/appMiddlewares/index.js"
import { addFriend,getFriend } from "../../controllers/appControllers/FriendController.js"

router.route("/").get(index)
router.route("/user-login").post(login)
router.route("/addfriend").post(verifyToken,verifyRequest,addFriend)
router.route("/getfriends").get(verifyToken,verifyRequest,getFriend)
router.route("/create-account").post(register)
router.route("/refreshToken").get(refreshToken)

export default router