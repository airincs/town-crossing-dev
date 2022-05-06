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
  const newNote = new PostNote({
    ...note,
    creator: req.userId,
    timeCreated: new Date().toISOString(),
  });

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

export const loveNote = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Does not have permission" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Id not found");
  const note = await PostNote.findById(id);
  const index = note.loveCount.findIndex((id) => id == String(req.userId));
  if (index == -1) {
    note.loveCount.push(req.userId);
  } else {
    note.loveCount = note.loveCount.filter((id) => id !== String(req.userId));
  }
  const updatedNote = await PostNote.findByIdAndUpdate(id, note, { new: true });
  res.json(updatedNote);
};
