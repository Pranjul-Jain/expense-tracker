import express from "express"
const router = express.Router()

import { index,login,register } from "../../controllers/appControllers/mainController.js"
import { verifyToken,verifyRequest } from "../../middlewares/appMiddlewares/index.js"
import { addFriend,getFriend } from "../../controllers/appControllers/FriendController.js"

router.route("/").get(index)
router.route("/user-login").post(login)
router.route("/addfriend").post(verifyToken,verifyRequest,addFriend)
router.route("/getFriend").get(getFriend)
router.route("/create-account").post(register)

export default router