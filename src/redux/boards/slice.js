import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addBoardsThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
  getBoardByIdThunk,
  updateBoardThunk,
} from "./operations";
import { logoutThunk } from "../auth/operations.js";

const initialState = {
  boards: [],
  selectedBoard: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "boards",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
        state.boards = action.payload || [];
      })
      .addCase(addBoardsThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.boards.push(action.payload);
        }
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(getBoardByIdThunk.fulfilled, (state, action) => {
        // console.log("payload", action.payload);
        state.selectedBoard = action.payload || null;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        const index = state.boards.findIndex(
          (board) => board.id === action.payload.id
        );
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(updateBoardThunk.rejected, (state, action) => {
        console.error("Failed to update board:", action.error?.message);
        state.loading = false;
        state.error = action.error?.message;
      })
      .addMatcher(
        isAnyOf(
          fetchBoardsThunk.pending,
          deleteBoardThunk.pending,
          addBoardsThunk.pending,
          getBoardByIdThunk.pending,
          updateBoardThunk.pending
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
          addBoardsThunk.rejected,
          getBoardByIdThunk.rejected,
          updateBoardThunk.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || "Something went wrong";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBoardsThunk.fulfilled,
          deleteBoardThunk.fulfilled,
          addBoardsThunk.fulfilled,
          getBoardByIdThunk.fulfilled,
          updateBoardThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const boardsReducer = slice.reducer;
