import { FETCH_ALL_NOTES, CREATE_NOTE, DELETE_NOTE, LOVE_NOTE } from '../constants/actionTypes';

export default (notes = [], action: any) => {
  switch (action.type) {
    case FETCH_ALL_NOTES:
      return action.payload;
    case CREATE_NOTE:
      return [...notes, action.payload];
    case DELETE_NOTE:
      return notes.filter((note: any) => note._id !== action.payload);
    case LOVE_NOTE:
      return notes.map((note: any) => note._id == action.payload._id ? action.payload : note);
    default:
      return notes;
  }
}