import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addBoardsThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
  getBoardByIdThunk,
  updateBoardThunk,
} from "./operations";
import { logoutThunk } from "../auth/operations.js";
import {
  onCreateColumn,
  onDeleteColumn,
  onEditColumn,
} from "../columns/operations.js";
import { addCard, deleteCard, updateCard } from "../cards/operations.js";
// import { createSelector } from "@reduxjs/toolkit";

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
      //COLUMNS
      .addCase(onCreateColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { boardId, column } = action.payload;
        return state.boards.map((board) => {
          if (board.id === boardId) {
            return {
              ...board,
              columns: [...board.columns, column],
            };
          }

          return board;
        });
      })
      .addCase(onDeleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("DEL COLUMN ID", action.payload);

        state.selectedBoard.columns = state.selectedBoard.columns.filter(
          (column) => column._id !== action.payload
        );
      })
      .addCase(onEditColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const columns = state.selectedBoard.columns;
        const updateColumn = action.payload.updatedColumn;
        const index = columns.findIndex((col) => col._id === updateColumn._id);

        if (index !== -1) {
          columns[index] = updateColumn;
        }
      })
      //CARDS
      .addCase(addCard.fulfilled, (state, action) => {
        const task = action.payload.data;
        const { columnId } = task;

        const column = state.selectedBoard.columns.find(
          (col) => col._id === columnId
        );

        if (column) {
          column.tasks = [...column.tasks, task];
        } else {
          console.error(`Column with ID ${columnId} not found`);
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const cardIdToDelete = action.payload.cardId;
        state.selectedBoard.columns.forEach((column) => {
          const cardIndex = column.tasks.findIndex(
            (card) => card._id === cardIdToDelete
          );

          if (cardIndex !== -1) {
            column.tasks.splice(cardIndex, 1);
            console.log(
              `Card with ID ${cardIdToDelete} removed from column ${column._id}`
            );
          }
        });
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const { _id, columnId, title, description, deadline, priority } =
          action.payload.data;

        const column = state.selectedBoard.columns.find(
          (col) => col._id === columnId
        );

        if (column) {
          const cardIndex = column.tasks.findIndex((card) => card._id === _id);

          if (cardIndex !== -1) {
            column.tasks[cardIndex] = {
              _id,
              title,
              description,
              deadline,
              priority,
              columnId,
            };
          }
        }
      })
      .addMatcher(
        isAnyOf(
          fetchBoardsThunk.pending,
          deleteBoardThunk.pending,
          addBoardsThunk.pending,
          getBoardByIdThunk.pending,
          onCreateColumn.pending,
          onDeleteColumn.pending,
          onEditColumn.pending,
          addCard.pending,
          deleteCard.pending,
          updateCard.pending
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
          onCreateColumn.rejected,
          onDeleteColumn.rejected,
          onEditColumn.rejected,
          addCard.rejected,
          deleteCard.rejected,
          updateCard.rejected
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
          onCreateColumn.fulfilled,
          onDeleteColumn.fulfilled,
          onEditColumn.fulfilled,
          addCard.fulfilled,
          deleteCard.fulfilled,
          updateCard.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const boardsReducer = slice.reducer;
