import express from 'express'
import {getAlluser, loginUser, registerUser, updateUser} from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.get('/getUser',getAlluser)
userRouter.put('/updateUser/:id',updateUser)
userRouter.post('/loginUser',loginUser)

export default userRouter;