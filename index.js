import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

import logger from "./middleware/logger.js"

import chatRoutes from "./routes/chats.js"
import messageRoutes from "./routes/messages.js"
import userRoutes from "./routes/users.js"

dotenv.config({ path: "./config/.env.local" });

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_ACCESS = process.env.MONGODB_ACCESS;

// Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// TODO: Put back Clerk Authentication
app.use("/users", userRoutes)
app.use("/messages", messageRoutes)
app.use("/chat", chatRoutes)

app.get("/", (req, res) => {
    res.send("Hello BeavsAI")
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated');
});

// Connect to MongoDB
mongoose.connect(MONGODB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("[BeavsAI-Backend] Successfully connected to MongoDB.")
}).catch((err) => {
    console.log(err)
    process.exit(1)
})

// Start server
app.listen(PORT, () => {
    console.log(`[BeavsAI-Backend] Server running on port: ${PORT}`)
})
