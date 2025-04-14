import { createSelector } from 'reselect';

export const selectColumnsByBoard = state => {
  return state.selectedBoards.columns;
};

export const selectLoading = state => state.columns.loading;
export const selectError = state => state.columns.error;

export const selectCardsInColumn = createSelector(
  [selectColumnsByBoard, (_, columnId) => columnId],
  (columns, columnId) => {
    const column = columns.find(column => column._id === columnId);
    return column ? column.tasks || [] : [];
  }
);

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
