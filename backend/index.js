// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import dbconnection from './src/config/db.js'
import userRouter from './src/routes/userRoute.js'
import bodyParser from 'body-parser'
import chatRouter from './src/routes/chatRoute.js'
import { chatSocket } from './src/socket/chatSocket.js'
import { createServer } from "http";
import { Server } from "socket.io";
const app = express()
dotenv.config()
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));




app.use("/help", userRouter)
app.use("/chat", chatRouter)

// Create HTTP server
const server = createServer(app);

// Create socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Socket logic
chatSocket(io);

// Connect to DB
dbconnection()


const port = process.env.PORT 
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    
})