import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
  loveNote,
} from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.patch("/:id/loveCount", loveNote);

export default router;
