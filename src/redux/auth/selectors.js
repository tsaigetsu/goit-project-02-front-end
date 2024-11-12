export const selectIsLoggedIn = (state) => {
  console.log("User", state.auth.user);
  return state.auth.isLoggedIn;
};
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectError = (state) => state.auth.error;
export const selectUserData = (state) => {
  console.log("User", state.auth.user);
  return state.auth.user;
};
