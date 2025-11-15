// const mongoose = require('mongoose')
import mongoose from "mongoose";

const dbconnection = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('Database connected successfully');
            
        })
        .catch(()=>{
            console.log('Database is not connected');
            
        })
        
    } catch (error) {
        console.log(`Error In Catch Block In Database Connection ${error}`);
        
    }
}
export default dbconnection 