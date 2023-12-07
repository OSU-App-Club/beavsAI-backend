import { Router } from "express";
import {createMessage, deleteMessage, getAllUserMessages, updateMessage, } from "../lib/message.js";

const router = Router();

router.post("/", async (req, res) => {
    const {userId} = req.auth;

    const {question} = req.body;
    const message = await createMessage(userId, question);

    if (!message) {
        return res.status(400).send({ERROR: "Cannot create message"});
    } else {
        return res.status(201).json(message);
    }
});

router.get("/", async (req, res) => {
    // Get all messages for a user
    const {userId} = req.auth;

    const messages = await getAllUserMessages(userId);
    return res.status(200).json(messages);
});

router.get("/:id", async (req, res) => {
    const {userId} = req.auth;
    const {id} = req.params;

    const message = await getMessage(id);
    if (!message) {
        return res.status(404).send({ERROR: "Cannot find message"});
    } else if (message.userId !== userId) {
        return res.status(403).send({ERROR: "Cannot access message"});
    } else {
        return res.status(200).json(message);
    }
});

router.put("/:id", async (req, res) => {
    const {userId} = req.auth;
    const {id} = req.params;
    const {question} = req.body;

    const message = await getMessage(id);
    if (!message) {
        return res.status(404).send({ERROR: "Cannot find message"});
    } else if (message.userId !== userId) {
        return res.status(403).send({ERROR: "Cannot access message"});
    } else {
        const updatedMessage = await editMessage(id, question);
        return res.status(200).json(updatedMessage);
    }
});

router.delete("/:id", async (req, res) => {
    const {userId} = req.auth;
    const {id} = req.params;

    const message = await getMessage(id);
    if (!message) {
        return res.status(404).send({ERROR: "Cannot find message"});
    } else if (message.userId !== userId) {
        return res.status(403).send({ERROR: "Cannot access message"});
    } else {
        await deleteMessage(id);
        return res.status(200).send(`Message ${id} was deleted`);
    }
});

router.put("/:id/:courseId", async (req, res) => {
    const {id, courseId} = req.params;
    const {question} = req.body;

    const message = await updateMessage(id, question, courseId);
    if (!message) {
        return res.status(404).send({ERROR: "Cannot find message"});
    } else {
        return res.status(200).json(message);
    }
});

export default router;
