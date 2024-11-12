// не використовується ???

export const selectColumnsByBoard = (state) => {
  console.log("state.selectedBoards.columns", state.selectedBoards.columns);

  return state.selectedBoards.columns;
};

export const selectLoading = (state) => state.columns.loading;
export const selectError = (state) => state.columns.error;
