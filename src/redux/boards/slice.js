import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addBoardsThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
  filterCardsByPriorityThunk,
  getBoardByIdThunk,
  updateBoardThunk,
} from './operations';
import { logoutThunk } from '../auth/operations.js';
import {
  onCreateColumn,
  onDeleteColumn,
  onEditColumn,
} from '../columns/operations.js';
import {
  addCard,
  deleteCard,
  moveCardToColumn,
  // setPriority,
  updateCard,
} from '../cards/operations.js';

const initialState = {
  boards: [],
  selectedBoard: null,
  filteredCards: [],
  priority: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setPriority: (state, action) => {
      state.priority = action.payload;
      localStorage.setItem('priority', JSON.stringify(action.payload));
    },
  },
  extraReducers: builder => {
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
        if (state.selectedBoard._id === action.payload) {
          state.selectedBoard = null;
        }
        state.boards = state.boards.filter(
          board => board._id !== action.payload
        );
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(getBoardByIdThunk.fulfilled, (state, action) => {
        state.selectedBoard = action.payload || null;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        const index = state.boards.findIndex(
          board => board._id === action.payload._id
        );

        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(updateBoardThunk.rejected, (state, action) => {
        // console.error('Failed to update board:', action.error?.message);
        state.loading = false;
        state.error = action.error?.message;
      })
      //COLUMNS
      .addCase(onCreateColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { column } = action.payload;
        state.selectedBoard.columns.push(column);
      })
      .addCase(onDeleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.selectedBoard.columns = state.selectedBoard.columns.filter(
          column => column._id !== action.payload
        );
      })
      .addCase(onEditColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const columns = state.selectedBoard.columns;
        const updateColumn = action.payload.updatedColumn;
        const index = columns.findIndex(col => col._id === updateColumn._id);

        if (index !== -1) {
          columns[index] = updateColumn;
        }
      })
      //CARDS
      .addCase(addCard.fulfilled, (state, action) => {
        const task = action.payload.data;
        const { columnId } = task;
        const column = state.selectedBoard.columns.find(
          col => col._id === columnId
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
        state.selectedBoard.columns.forEach(column => {
          const cardIndex = column.tasks.findIndex(
            card => card._id === cardIdToDelete
          );

          if (cardIndex !== -1) {
            column.tasks.splice(cardIndex, 1);
          }
        });
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const { _id, columnId, title, description, deadline, priority } =
          action.payload.data;

        const column = state.selectedBoard.columns.find(
          col => col._id === columnId
        );

        if (column) {
          const cardIndex = column.tasks.findIndex(card => card._id === _id);

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
      .addCase(moveCardToColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBoard.columns.forEach(column => {
          const cardIndex = column.tasks.findIndex(
            task => task._id === action.payload._id
          );
          if (cardIndex !== -1) {
            column.tasks.splice(cardIndex, 1);
          }
          if (column._id === action.payload.columnId) {
            column.tasks.push(action.payload);
          }
        });
      })
      .addCase(filterCardsByPriorityThunk.fulfilled, (state, action) => {
        const { boardId, filteredBoard } = action.payload;
        const boardIndex = state.findIndex(b => b._id === boardId);
        if (boardIndex !== -1) {
          state[boardIndex].columns = filteredBoard; // Обновляем колонки для борда
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
          updateCard.pending,
          filterCardsByPriorityThunk.pending
        ),
        state => {
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
          updateCard.rejected,
          filterCardsByPriorityThunk.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'Something went wrong';
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
          updateCard.fulfilled,
          filterCardsByPriorityThunk.fulfilled
        ),
        state => {
          state.loading = false;
        }
      );
  },
});

export const boardsReducer = slice.reducer;
export const { setPriority } = slice.actions;
