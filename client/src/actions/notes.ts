import * as api from '../api';

export const getNotes = () => async (dispatch: any) => {
  try {
    const {data} = await api.fetchNotes();
    dispatch({type: 'FETCH_ALL_NOTES', payload: data});
  } catch (error: any) {
    console.log(error.message)
  } 
}

export const createNote = (note: any) => async (dispatch: any) => {
  try {
    const {data} = await api.createNote(note);
    dispatch({type: 'CREATE_NOTE', payload: data})
  } catch (error) {
    console.log(error);
  }
}

export const deleteNote = (id: any) => async (dispatch: any) => {
  try {
    await api.deleteNote(id);
    dispatch({type: "DELETE_NOTE", payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const loveNote = (id: any) => async (dispatch: any) => {
  try{
    const { data } = await api.loveNote(id);
    dispatch({type: 'LOVE_NOTE', payload: data})
  } catch (error) {
    console.log(error)
  }
}