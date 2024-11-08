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
      .addCase(getBoardByIdThunk.fulfilled, (state, action) => {
        state.selectedBoard = action.payload;
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
        console.error("Failed to update board:", action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchBoardsThunk.pending,
          deleteBoardThunk.pending,
          addBoardsThunk.pending,
          getBoardByIdThunk.pending
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
          getBoardByIdThunk.rejected
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
          addBoardsThunk.fulfilled,
          getBoardByIdThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const boardsReducer = slice.reducer;
