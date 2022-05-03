import * as api from '../api';
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const getNotes = () => async (dispatch: any) => {
  try {
    const {data} = await api.fetchNotes();
    dispatch({type: 'FETCH_ALL_NOTES', payload: data});
  } catch (error: any) {
    console.log(error.message)
  } 
}