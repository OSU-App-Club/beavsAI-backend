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
}, { versionKey: false, timestamps: true })

const ChatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    messages: {
        type: [MessageSchema],
        required: true
    }
}, { versionKey: false, timestamps: true })

const Chat = mongoose.model("Chat", ChatSchema)
const Message = mongoose.model("Message", MessageSchema)

export { Chat };
export default Message
