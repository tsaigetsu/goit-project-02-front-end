export const selectBoards = state => {
  const boards = state.boards.boards;
  return boards;
};
export const selectedBoard = state => {
  const board = state.boards.selectedBoard;
  return board;
};
