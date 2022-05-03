export default (notes = [], action: any) => {
  switch (action.type) {
    case 'FETCH_ALL_NOTES':
      return action.payload;
    case 'CREATE_NOTE':
      return [...notes, action.payload];
    default:
      return notes;
  }
}