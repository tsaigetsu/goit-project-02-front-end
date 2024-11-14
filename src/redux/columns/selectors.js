import { createSelector } from 'reselect';
// не використовується ???

export const selectColumnsByBoard = state => {
  return state.selectedBoards.columns;
};

export const selectLoading = state => state.columns.loading;
export const selectError = state => state.columns.error;

// Селектор для загрузки и ошибок

// export const selectColumnsByBoard = (state) => state.columns.columnsByBoard;

// export const selectCardsInColumn = (state, columnId) => {
//   const columns = state.columns.columnsByBoard;
//   const column = columns.find((column) => {
//     return column._id === columnId;
//   });
//   return column ? column.tasks || [] : []; // Повертає картки або порожній масив, якщо колонка не знайдена
// };

// Мемоизованный селектор для Отримання всіх карток в певній колонці за її _id
export const selectCardsInColumn = createSelector(
  [selectColumnsByBoard, (_, columnId) => columnId],
  (columns, columnId) => {
    const column = columns.find(column => column._id === columnId);
    return column ? column.tasks || [] : [];
  }
);

// export const selectCardById = (state, columnId, cardId) => {
//   const column = state.columnsByBoard.columns.find(
//     (column) => column._id === columnId
//   );
//   if (column) {
//     return column.cards.find((card) => card._id === cardId);
//   }
//   return null; // Якщо колонка не знайдена або картка не знайдена
// };

// Мемоизованный селектор для Отримання картки за її _id та id колонки
export const selectCardById = createSelector(
  [selectColumnsByBoard, (_, columnId) => columnId, (_, __, cardId) => cardId],
  (columns, columnId, cardId) => {
    const column = columns.find(column => column._id === columnId);
    if (column) {
      return column.cards.find(card => card._id === cardId);
    }
    return null;
  }
);
