import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addBoardsThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
} from "./operations";
import { logoutThunk } from "../auth/operations.js";

const initialState = {
  boards: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "boards",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(addBoardsThunk.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          fetchBoardsThunk.pending,
          deleteBoardThunk.pending,
          addBoardsThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBoardsThunk.rejected,
          deleteBoardThunk.rejected,
          addBoardsThunk.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBoardsThunk.fulfilled,
          deleteBoardThunk.fulfilled,
          addBoardsThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const boardsReducer = slice.reducer;
