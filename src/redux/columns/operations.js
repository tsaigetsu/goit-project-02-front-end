import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api.js';

export const onCreateColumn = createAsyncThunk(
  'addColumn',
  async (newColumn, thunkAPI) => {
    try {
      const response = await api.post('columns', newColumn);

      const CreatedColumn = response.data.data;

      return { boardId: CreatedColumn.boardId, column: CreatedColumn };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onDeleteColumn = createAsyncThunk(
  'deleteColumn',
  async (columnId, thunkAPI) => {
    try {
      await api.delete(`columns/${columnId}`);

      return columnId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onEditColumn = createAsyncThunk(
  'editColumn',
  async ({ columnId, updateColumn }, thunkAPI) => {
    try {
      const response = await api.patch(`columns/${columnId}`, updateColumn);

      return { updatedColumn: response.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const filterCardsByPriority = createAsyncThunk(
  'columns/filterCardsByPriority',
  async ({ priority }, { getState }) => {
    const state = getState();
    const { allColumns } = state.columns;

    if (priority === 'all') {
      return allColumns;
    } else {
      const filteredColumns = allColumns.map(column => ({
        ...column,
        cards: column.cards.filter(card => card.priority === priority),
      }));
      return filteredColumns;
    }
  }
);
