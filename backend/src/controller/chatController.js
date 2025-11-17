import chatModel from "../models/chatModel.js";

// send message

export const sendMessage = async(req,res)=>{
    try {
        const {receiver, message} = req.body;
        console.log(req.user , '******');
        
        
        const sender = req.user._id;
        console.log(sender);

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
  roomId,
  deliveredAt: new Date(),  // ✔ message delivered timestamp
});


        return res.status(201).json(newMessage)
        
    } catch (error) {
         return res.status(500).json({
            success:false,
            message: error.message 
        });
    }
}


// --------------------- GET MESSAGES OF TWO USERS ---------------------
export const getMessages = async (req, res) => {
  try {
    const { id: otherUserId } = req.params;
    const userId = req.user._id;

    const roomId =
      userId < otherUserId
        ? `${userId}_${otherUserId}`
        : `${otherUserId}_${userId}`;

    const messages = await chatModel.find({ roomId }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// --------------------- GET ALL CHATS FOR A USER (OPTIONAL) ---------------------
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await chatModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender receiver", "name email");

    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

////

export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await chatModel.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Sirf receiver hi read mark kar sakta hai
    if (message.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    message.isRead = true;
    message.readAt = new Date();
    await message.save();

    return res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: message,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
