export const selectBoards = (state) => state.boards.boards;
export const selectedBoard = (state) => {
  console.log("State in selector:", state.boards.selectedBoard);
  return state.boards.selectedBoard;
};
