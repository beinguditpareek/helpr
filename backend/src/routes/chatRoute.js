import express from 'express'
import { sendMessage } from '../controller/chatController.js'
const chatRouter = express.Router()


chatRouter.post('/send',sendMessage)

export default chatRouter