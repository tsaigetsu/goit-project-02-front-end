export const selectBoards = (state) => {
  console.log("boards", state.boards.boards);
  const boards = state.boards.boards;
  return boards;
};
export const selectedBoard = (state) => {
  const board = state.boards.selectedBoard;
  console.log("board", state.boards.selectedBoard);

  return board;
};
