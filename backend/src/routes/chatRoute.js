import express from 'express'
import { getMessages, getUserChats, markAsRead, sendMessage } from '../controller/chatController.js'
import { protect } from '../middleware/userAuth.js'
const chatRouter = express.Router()


chatRouter.post('/send',protect,sendMessage)
//Get all messages between logged in user and :id user
chatRouter.get("/messages/:id", protect, getMessages);
//Get all chats of logged-in user
chatRouter.get("/my-chats", protect, getUserChats);
//
chatRouter.put("/read/:messageId", protect, markAsRead);



export default chatRouter