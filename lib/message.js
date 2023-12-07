import axios from "axios";
import mongoose from "mongoose";
import Message, { Chat } from "../models/Message.js";
import { Course } from "../models/User.js";

const getAIResponse = async (question, courseId) => {
    const course = await Course.findById({ _id: new mongoose.Types.ObjectId(courseId) });
    let crn = "";
    if (course) {
        crn = course.crn;
    } else {
        throw { status: 404, message: "Course not found" };
    }
    const requestData = {
        class_name: `${crn}`,
        query: `${question}`
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: false
    }

    try {
        let response = await axios.post("http://localhost:8080/response", requestData, config)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

const updateMessage = async (messageId, question, courseId) => {
    const aiResponse = await getAIResponse(question, courseId);
    const message = await Chat.findOneAndUpdate({ "messages._id": messageId }, { $set: { "messages.$.answer": aiResponse.response } }, { new: true });
    return message;
}


const createMessage = async ({ senderType, userId, question, courseId, answer: aiResponse }) => {
    console.log("createMessage", senderType, userId, question, courseId);
    if (senderType === "Bot") {
        const message = new Message({
            userId: senderType === "Bot" ? "" : userId,
            question: senderType === "Bot" ? "" : question,
            answer: senderType === "Bot" ? aiResponse : "",
            senderType,
        });
        return await message.save();
    }

    // const aiResponse = await getAIResponse(question, courseId);

    const send = new Message({
        userId: senderType === "Bot" ? "" : userId,
        question: senderType === "Bot" ? "" : question,
        answer: "",
        senderType,
    });

    try {
        return await send.save();
    } catch (error) {
        console.log(error);
    }
};

const createChat = async ({ userId, courseId }) => {
    const chat = new Chat({
        userId: userId,
        messages: [],
        courseId: courseId,
    })
    chat.courseName = await chat.getCourseName();
    try {
        return await chat.save()
    } catch (error) {
        console.log(error)
    }
}

const addMessageToChat = async (userId, chatId, message, courseId) => {
    try {
        const chat = await Chat.findById(chatId);
        if (chat) {
            const res = await createMessage({ senderType: message.senderType, userId, question: message.question, courseId, answer: message.answer });
            chat.messages.push(res);
            return await chat.save();
        } else {
            throw { status: 404, message: "Chat not found" };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllUserMessages = async (userId) => {
    try {
        const chat = await Chat.findOne({ userId });
        if (chat) {
            return chat.messages;
        } else {
            throw { status: 404, message: "Chat not found" };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getChatById = async (userId, chatId) => {
    try {
        const chat = await Chat.findOne({ userId, _id: chatId });
        if (chat) {
            return chat;
        } else {
            throw { status: 404, message: "Chat not found" };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllMessagesForChat = async (userId, chatId) => {
    try {
        const chat = await Chat.findOne({ userId, _id: chatId });
        if (chat) {
            return chat.messages;
        } else {
            throw { status: 404, message: "Chat not found" };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteMessage = async (userId, chatId, messageId) => {
    try {
        const chat = await Chat.findOne({ userId, _id: chatId });
        if (chat) {
            await Message.findByIdAndDelete(messageId);
            chat.messages = chat.messages.filter((message) => message._id.toString() !== messageId);
            return await chat.save();
        } else {
            throw { status: 404, message: "Chat not found" };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteChat = async (userId, chatId) => {
    try {
        return await Chat.findOneAndDelete({ userId, _id: chatId });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllUserChats = async (userId) => {
    try {
        return await Chat.find({ userId });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export {
    addMessageToChat,
    createChat,
    createMessage, deleteChat, deleteMessage, getAIResponse, getAllMessagesForChat, getAllUserChats, getAllUserMessages, getChatById, updateMessage
};
