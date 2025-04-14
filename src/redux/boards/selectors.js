export const selectBoards = state => state.boards.boards;

export const selectedBoard = state => state.boards.selectedBoard;

export const selectedBoardById = (state, boardId) =>
  state.boards.boards.find(board => board._id === boardId);

export const selectFilteredCardsByBoard = state => {
  const board = state.boards.selectedBoard;
  const priority = state.boards.priority;

  if (!board) return [];

  // Если фильтр сброшен, возвращаем все карточки
  if (!priority) {
    return board.columns;
  }

  // Фильтруем карточки по приоритету
  return board.columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => task.priority === priority),
  }));
};
