import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
     roomId: {
      type: String,   // sender + receiver id combined
      required: true,
    },
    // --- NEW FIELDS ---
    isRead: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    readAt: {
      type: Date,
    },
  },
  { timestamps: true }

)
export default mongoose.model("Chat",chatSchema)