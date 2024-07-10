import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/Schemas.js";  // Correct import
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003; // Update port to match the client-side request

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000" // Allow only this origin
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Error connecting to MongoDB", err);
});

app.get("/data", async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/data/new", async (req, res) => {
    console.log("Received data:", req.body); // Debugging log

    const { fields } = req.body;

    if (!fields || !Array.isArray(fields)) {
        return res.status(400).json({ error: "Fields array is required" });
    }

    const newUser = new User({ fields });

    try {
        const data = await newUser.save();
        console.log("Saved data:", data); // Debugging log
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/data/delete/:id", async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
