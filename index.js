import express from "express"

const app = express()
const PORT = 8080

app.get("/", (req, res) => {
    res.send("Hello BeavsAI")
})

app.listen(PORT, () => {
    console.log(`BeavsAI Backend server running on port ${PORT}`)
})