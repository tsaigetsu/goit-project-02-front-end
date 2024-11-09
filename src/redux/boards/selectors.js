export const selectBoards = (state) => state.boards.boards;
export const selectedBoard = (state) => {
  console.log("selectedBoard", state.boards.selectedBoard);
  return state.boards.selectedBoard;
};
