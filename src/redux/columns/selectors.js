// export const selectLoading = (state) => state.columns.loading;
// export const selectError = (state) => state.columns.error;
// export const selectColumnsByBoard = (state) => {
//     return state.columns.columnsByBoard;
//   };

// Отримання всіх карток в певній колонці за її _id
export const selectCardsInColumn = (state, columnId) => {
  console.log("state", state);
  const columns = state.columns.columnsByBoard;

  const column = columns.find((column) => {
    console.log("column", column);
    return column._id === columnId;
  });
  console.log("column.tasks", column.tasks);

  return column ? column.tasks || [] : []; // Повертає картки або порожній масив, якщо колонка не знайдена
};

// Отримання картки за її _id та id колонки
export const selectCardById = (state, columnId, cardId) => {
  const column = state.columnsByBoard.columns.find(
    (column) => column._id === columnId
  );
  if (column) {
    return column.cards.find((card) => card._id === cardId);
  }
  return null; // Якщо колонка не знайдена або картка не знайдена
};
