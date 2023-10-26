import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

import logger from "./middleware/logger.js"

import userRoutes from "./routes/users.js"

dotenv.config({ path: "./config/.env.local" });

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_ACCESS = process.env.MONGODB_ACCESS;

// Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes)

// Hello World
app.get("/", (req, res) => {
    res.send("Hello BeavsAI")
})

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
