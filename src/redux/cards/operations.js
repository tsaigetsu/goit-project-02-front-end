import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api.js';

export const addCard = createAsyncThunk('addCard', async (data, thunkAPI) => {
  try {
    const response = await api.post('/tasks', data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteCard = createAsyncThunk(
  'deleteCard',
  async (cardId, thunkAPI) => {
    try {
      await api.delete(`/tasks/${cardId}`);

      return { cardId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCard = createAsyncThunk(
  'updateCard',
  async ({ _id, data }, thunkAPI) => {
    try {
      const response = await api.patch(`/tasks/${_id}`, data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveCardToColumn = createAsyncThunk(
  'moveCardToColumn',
  async ({ cardId, columnId }, thunkAPI) => {
    try {
      const response = await api.patch(`/tasks/${cardId}`, {
        columnId,
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
