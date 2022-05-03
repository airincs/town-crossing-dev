import axios from "axios";

const url = "http://localhost:3001/notes";

export const fetchNotes = () => axios.get(url);
