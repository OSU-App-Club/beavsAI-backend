import { Router } from "express";
import {
    addMessageToChat,
    createChat,
    createMessage,
    deleteChat,
    deleteMessage,
    getAIResponse,
    getAllMessagesForChat,
    getAllUserChats,
    getAllUserMessages,
    getChatById
} from "../lib/message.js";

const router = Router();

// Create a new chat for a user
router.post("/", async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        const chat = await createChat({ userId, courseId });
        chat.courseName = await chat.getCourseName();
        res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Add a message to an existing chat
router.post("/:userId/chats/:chatId/messages", async (req, res) => {
    const { userId, chatId } = req.params;
    const { message, courseId } = req.body;
    console.log("addMessageToChat", userId, chatId, message, courseId);
    try {
        console.log("addMessageToChat", userId, chatId, message, courseId)
        const chat = await addMessageToChat(userId, chatId, message, courseId);
        res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Get all messages for a user
router.get("/:userId/messages", async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await getAllUserMessages(userId);
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Get a specific chat by ID
router.get("/:userId/chats/:chatId", async (req, res) => {
    const { userId, chatId } = req.params;
    try {
        const chat = await getChatById(userId, chatId);
        res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Get all messages for a specific chat
router.get("/:userId/chats/:chatId/messages", async (req, res) => {
    const { userId, chatId } = req.params;
    try {
        const messages = await getAllMessagesForChat(userId, chatId);
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Delete a message from a specific chat
router.delete("/:userId/chats/:chatId/messages/:messageId", async (req, res) => {
    const { userId, chatId, messageId } = req.params;
    try {
        const chat = await deleteMessage(userId, chatId, messageId);
        res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Delete a specific chat
router.delete("/:userId/chats/:chatId", async (req, res) => {
    const { userId, chatId } = req.params;
    try {
        await deleteChat(userId, chatId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Get all chats for a user
router.get("/:userId/chats", async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await getAllUserChats(userId);
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message });
    }
});

router.post("/response", async (req, res) => {
    const { userId, chatId, message: data, courseId } = req.body;
    try {
        const aiResponse = await getAIResponse(data.question, courseId);
        console.log("lul",aiResponse.response);
        let message = {
            answer: aiResponse.response,
            userId: "",
            question: data.question,
            chatId: chatId,
            courseId: courseId,
            senderType: data.senderType,
        }
        const chat = await createMessage(message);
        console.log("chat", chat);
        return res.status(201).json(message);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message });
    }
});

export default router;
