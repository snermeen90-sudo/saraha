import {Router} from "express"
import * as US from './user.service.js'
import{Authentication}  from "../../../common/middleware/authentication.js"
import{Authorization}  from "../../../common/middleware/authorization.js"
import {RoleEnum} from "../../../common/enum/user.enum.js"
import {validation} from "../../../common/middleware/validation.js"
import {signUpSchema} from "../users/user.validation.js"

const userRouter =Router()

userRouter.post("/signUp",validation(signUpSchema),US.signUp)
userRouter.post("/signup/gmail",US.signUpWithGmail)
userRouter.post("/signIn",US.signIn)
userRouter.get("/profile",Authentication,Authorization(RoleEnum.user),US.getProfile)



export default userRouter