import axios from "axios";

const url = "http://localhost:3001/notes";

export const fetchNotes = () => axios.get(url);
export const createNote = (newNote: any) => axios.post(url, newNote);
export const deleteNote = (id: any) => axios.delete(`${url}/${id}`);
export const loveNote = (id: any) => axios.patch(`${url}/${id}/loveCount`);
