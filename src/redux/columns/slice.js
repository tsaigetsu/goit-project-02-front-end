import { createSlice } from "@reduxjs/toolkit";
import {
  onCreateColumn,
  onDeleteColumn,
  onEditColumn,
  onGetColumn,
} from "./operations";
// import { logout } from "../auth/operations.js";

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    columnsByBoard: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(onCreateColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(onCreateColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { boardId, column } = action.payload;
        if (!state.columnsByBoard[boardId]) {
          state.columnsByBoard[boardId] = [];
        }
        state.columnsByBoard = [...state.columnsByBoard, column];
      })
      .addCase(onGetColumn.fulfilled, (state, { payload }) => {
        state.columnsByBoard = payload; //добавить пендинг и реджектед
      })
      .addCase(onCreateColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(onDeleteColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(onDeleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.columnsByBoard.findIndex(
          (contact) => contact.id === action.payload._id
        );
        state.columnsByBoard.splice(index, 1);
      })
      .addCase(onDeleteColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(onEditColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(onEditColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const columns = state.columnsByBoard;
        const updateColumn = action.payload.updatedColumn;
        const index = columns.findIndex((col) => col._id === updateColumn._id);

        if (index !== -1) {
          columns[index] = updateColumn;
        }
      })
      .addCase(onEditColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // .addCase(logout.fulfilled, (state) => {
    //   state.items = [];
    //   state.error = null;
    //   state.loading = false;
    // });
  },
});

export const columnsReducer = columnsSlice.reducer;
export const selectColumnsByBoard = (state) => {
  return state.columns.columnsByBoard;
};

// export const selectLoading = (state) => state.columns.loading;
// export const selectError = (state) => state.columns.error;
