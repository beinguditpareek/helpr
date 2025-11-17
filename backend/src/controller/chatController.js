import chatModel from "../models/chatModel.js";

// send message

export const sendMessage = async()=>{
    try {
        const {receiver, message} = req.body;
        const sender = req.body._id;

        if(!receiver || !message){
            return res.status(400).json({
                success:false,
                message:"Receiver and message required"
            })
        }

        const roomId = sender < receiver ? `${sender}_${receiver}` : `${receiver}_${sender}`;

        const newMessage = await chatModel.create({
            sender,
            receiver,
            message,
            roomId
        })

        return res.status(201).json(newMessage)
        
    } catch (error) {
         return res.status(500).json({
            success:false,
            message: error.message 
        });
    }
}