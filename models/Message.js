import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { versionKey: false })

const Message = mongoose.model("Message", MessageSchema)

export default Message
