import express from 'express'
import {getAlluser, loginUser, registerUser} from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.get('/getUser',getAlluser)
userRouter.post('/loginUser',loginUser)

export default userRouter;