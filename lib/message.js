import Message, { Chat } from "../models/Message.js";


const createMessage = async (userId, question) => {
    const response = "Intelligent AI response" //TODO - call AI API

    const message = new Message({
        userId: userId,
        question: question,
        answer: response
    })

    try {
        return await message.save()
    } catch (error) {
        console.log(error)
    }
}

const createChat = async (userId) => {
    const chat = new Chat({
        userId: userId,
        messages: []
    })

    try {
        return await chat.save()
    } catch (error) {
        console.log(error)
    }
}

const addMessageToChat = async (userId, chatId, message) => {
    try {
        const chat = await Chat.findById(chatId);
        if (chat) {
            const res = await createMessage(userId, message);
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
    deleteChat,
    deleteMessage,
    getAllMessagesForChat,
    getChatById,
    getAllUserMessages,
    addMessageToChat,
    createChat,
    createMessage,
    getAllUserChats
};