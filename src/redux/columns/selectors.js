export const selectColumnsByBoard = (state, boardId) =>
  state.columns.columnsByBoard[boardId] ?? [];

export const selectLoading = (state) => state.columns.loading;
export const selectError = (state) => state.columns.error;
