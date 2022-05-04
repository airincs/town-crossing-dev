import mongoose from "mongoose";
import PostNote from "../models/postNote.js";

export const getNotes = async (req, res) => {
  try {
    const postNotes = await PostNote.find();
    res.status(200).json(postNotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const note = req.body;
  const newNote = new PostNote(note);

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Id not found");
  await PostNote.findByIdAndRemove(id);
  res.json({ message: "Note deleted" });
};
