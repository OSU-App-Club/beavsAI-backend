import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    question: {
        type: String,
        required: false
    },
    answer: {
        type: String,
        required: false
    },
    senderType: {
        type: String,
        enum: ["User", "Bot"],
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
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        unique: true
    },
    courseName: {
        type: String,
        required: false,
        unique: true
    }
}, { versionKey: false, timestamps: true })

ChatSchema.methods.getCourseName = async function () {
    const course = await mongoose.model("Course").findById(this.courseId);
    return course.course_name;
}

const Chat = mongoose.model("Chat", ChatSchema)
const Message = mongoose.model("Message", MessageSchema)

export { Chat };
export default Message
