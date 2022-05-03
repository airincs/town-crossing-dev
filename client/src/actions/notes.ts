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