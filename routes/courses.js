import { Router } from "express";
import { getAllCourses, getChatId, getCourseInfo, getSingleCourse } from "../lib/courses.js";

const router = Router();

// Get all courses
router.get("/", async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific course by ID
router.get("/:id", async (req, res) => {
    try {
        const course = await getSingleCourse(req.params.id);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a user's chatID for a specific course (this works since each course has a unique chatID)
router.get('/:userId/chat/:courseId', async (req, res) => {
    const { userId, courseId } = req.params;
    try {
        const chatId = await getChatId(userId, courseId);
        res.status(200).json(chatId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific chat by ID
router.get("/:userId/chats/:chatId", async (req, res) => {
    const { userId, chatId } = req.params;
    try {
        const chat = await getCourseInfo(userId, chatId);
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;