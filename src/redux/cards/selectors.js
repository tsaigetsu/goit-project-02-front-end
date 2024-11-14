import { createSelector } from "reselect";
// Отримання всіх карток в певній колонці за її _id
const selectCardsInColumn = (state) => state.boards.selectedBoard.columns;

export const selectCardsFromColumn = createSelector(
  [selectCardsInColumn, (state, columnId) => columnId],
  (columns, columnId) => {
    // console.log("columns", columns);
    const column = columns.find((column) => column._id === columnId);

    return column ? column.tasks || [] : []; // Повертає картки або порожній масив, якщо колонка не знайдена
  }
);

// Отримання картки за її _id та id колонки
export const selectCardById = (state, columnId, cardId) => {
  const column = state.boards.selectedBoard.columns.find(
    (column) => column._id === columnId
  );
  if (column) {
    return column.cards.find((card) => card._id === cardId);
  }
  return null; // Якщо колонка не знайдена або картка не знайдена
};
