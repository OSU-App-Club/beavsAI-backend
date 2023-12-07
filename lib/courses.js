import { Chat } from "../models/Message.js";
import { Course } from "../models/User.js";

const getAllCourses = async () => {
    try {
        return await Course.find({});
    } catch (error) {
        console.log(error);
    }
}

const getSingleCourse = async (id) => {
    try {
        return await Course.findById(id);
    } catch (error) {
        console.log(error);
    }
}

const getChatId = async (userId, courseId) => {
    try {
        const chat = await Chat.findOne({ userId, courseId });
        return chat._id;
    } catch (error) {
        console.log(error);
    }
}

const getCourseInfo = async (userId, chatId) => {
    try {
        return await Chat.findOne({ userId, _id: chatId });
    } catch (error) {
        console.log(error);
    }
}

export { getAllCourses, getChatId, getCourseInfo, getSingleCourse };
