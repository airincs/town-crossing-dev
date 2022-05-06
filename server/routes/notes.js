import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
  loveNote,
} from "../controllers/notes.js";

import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getNotes);
router.post("/", auth, createNote);
router.delete("/:id", auth, deleteNote);
router.patch("/:id/loveCount", auth, loveNote);

export default router;
