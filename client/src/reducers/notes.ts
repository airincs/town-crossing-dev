export default (notes = [], action: any) => {
  switch (action.type) {
    case 'FETCH_ALL_NOTES':
      return action.payload;
    case 'CREATE_NOTE':
      return notes;
    default:
      return notes;
  }
}