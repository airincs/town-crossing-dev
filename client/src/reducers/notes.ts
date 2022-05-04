export default (notes = [], action: any) => {
  switch (action.type) {
    case 'FETCH_ALL_NOTES':
      return action.payload;
    case 'CREATE_NOTE':
      return [...notes, action.payload];
    case 'DELETE_NOTE':
      return notes.filter((note: any) => note._id !== action.payload);
    default:
      return notes;
  }
}