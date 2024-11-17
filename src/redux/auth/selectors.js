export const selectIsLoggedIn = state => {
  return state.auth.isLoggedIn;
};
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectError = state => state.auth.error;
export const selectUserData = state => {
  // console.log('selectUserData', state.auth.user); //данные приходят

  return state.auth.user;
};
export const selectToken = state => {
  // console.log('selectToken', state.auth.token);

  return state.auth.token;
};
