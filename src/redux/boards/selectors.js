export const selectBoards = state => {
  const boards = state.boards.boards;
  return boards;
};
export const selectedBoard = state => {
  const board = state.boards.selectedBoard;
  return board;
};

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
