import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { authReducer } from "./auth/slice.js";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { boardsReducer } from "./boards/slice.js";
import { columnReducer } from "./columns/slice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    auth: persistReducer(persistConfig, authReducer),
    columns: columnReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
