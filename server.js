const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/quicknotes")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Note Schema
const noteSchema = new mongoose.Schema({
    text: String
});

const Note = mongoose.model("Note", noteSchema);

// Save Note
app.post("/notes", async (req, res) => {
    const note = new Note({
        text: req.body.text
    });

    await note.save();
    res.json({ message: "Note Saved" });
});

// Get Notes
app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});