import mongoose from "mongoose";

/*
 {
        "index": "cs325-index",
        "filename": "CS325_F23.pdf",
        "term": "F23",
        "crn": "325",
        "course_name": "Analysis of Algorithms",
    },
*/

const CourseSchema = new mongoose.Schema({
    index: {
        type: String,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    crn: {
        type: String,
        required: true,
    },
    course_name: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }]
}, { versionKey: false })

/*
 * To be honest, with our OAuth provider, we don't really need a User model.
 * However, we may want to add some additional fields to our User that isn't 
 * provided by our OAuth provider for Beavs.ai, so we'll create a User model for now.
*/
const UserSchema = new mongoose.Schema({
    /* 
     * required: true means that the field is mandatory to "create" a new User
     * in mongodb, the primary key "_id" is automatically generated
     * mongoose types: https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype
    */
    name: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    standing: {
        type: String,
        required: true,
    },
    courses: [CourseSchema],
}, { versionKey: false })

const User = mongoose.model("User", UserSchema)
const Course = mongoose.model("Course", CourseSchema)

export default User
export { Course }