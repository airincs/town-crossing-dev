import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")!).token
    }`;
  }
  return req;
});

export const fetchNotes = () => API.get("/notes");
export const createNote = (newNote: any) => API.post("/notes", newNote);
export const deleteNote = (id: any) => API.delete(`/notes/${id}`);
export const loveNote = (id: any) => API.patch(`/notes/${id}/loveCount`);

export const signIn = (signInData: any) =>
  API.post("/users/signin", signInData);
export const signUp = (signUpData: any) =>
  API.post("/users/signup", signUpData);
