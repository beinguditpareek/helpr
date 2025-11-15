import express from 'express'
import {registerUser} from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/register', (req, res, next) => {
  console.log("Route Hitted Successfully!");
  next();
}, registerUser);

export default userRouter;