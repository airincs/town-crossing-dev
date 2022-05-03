import axios from "axios";

const url = "http://localhost:3001/notes";

export const fetchNotes = () => axios.get(url);
export const createNote = (newNote: any) => axios.post(url, newNote);
