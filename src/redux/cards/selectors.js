export const selectCards = (state) => state.cards.items;
export const selectCardById = (state, cardId) => 
  state.cards.items.find((card) => card.id === cardId);
export const selectLoading = (state) => state.cards.loading;
export const selectError = (state) => state.cards.error;