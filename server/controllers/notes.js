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
  const post = req.body;
  const newNote = new PostNote(note);

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
