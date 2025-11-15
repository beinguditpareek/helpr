// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import dbconnection from './src/config/db.js'
import userRouter from './src/routes/userRoute.js'
// import bodyParser from 'body-parser'
const app = express()
dotenv.config()
// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


dbconnection()

app.use("/help", userRouter)
app.get("/", (req, res) => {
  res.send("Server Running");
});

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    
})