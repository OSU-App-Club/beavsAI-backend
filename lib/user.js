import clerkClient from "@clerk/clerk-sdk-node";
import axios from "axios";
import { Course } from "../models/User.js";

/* 
 * This is the controller for creating a new User.
 * It is called by the route handler in routes/users.js
 */

const deleteUser = async (id) => {
    try {
        return await clerkClient.users.deleteUser(id);
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async () => {
    try {
        return await clerkClient.users.getUserList();
    } catch (error) {
        console.log(error);
    }
}

const getSingleUser = async (id) => {
    try {
        return await clerkClient.users.getUser(id);
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (id, name, major, standing) => {
    const params = {
        first_name: name,
        publicMetadata: {
            major: major,
            standing: standing
        },
    };

    try {
        return await clerkClient.users.updateUser(id, params)
    } catch (error) {
        console.log(error)
    }
}

const initCourses = async () => {
    const courses = await Course.find({});
    if (courses.length > 0) return { message: "[BeavsAI-Backend] Courses already initialized." };
    const courseIds = courses.map(course => course.crn);
    const data = await axios.get("http://localhost:8080/available_data");
    const courseData = data.data;
    const filteredData = courseData.filter(course => !courseIds.includes(course.crn)) || courseData;
    const newCourses = filteredData.map(course => {
        return {
            index: course.index,
            term: course.term,
            crn: course.crn,
            course_name: course.course_name,
            users: []
        }
    });
    await Course.insertMany(newCourses);
}

export {
    deleteUser,
    getAllUsers,
    getSingleUser, initCourses, updateUser
};
