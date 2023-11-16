import Message from "../models/Message.js";

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

const getAllUserMessages = async (userId) => {
    try {
        return await Message.find({ userId: userId })
    } catch (error) {
        console.log(error)
    }
}

const getMessage = async (id) => {
    try {
        return await Message.findById(id)
    } catch (error) {
        console.log(error)
    }
}

const editMessage = async (id, question, answer) => {
    const message = await getMessage(id)

    if (message) {
        message.question = question
        message.answer = answer

        try {
            return await message.save()
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("Message not found")
    }
}

const deleteMessage = async (id) => {
    try {
        return await Message.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
}

export {
    createMessage, deleteMessage, editMessage, getAllUserMessages, getMessage
}
