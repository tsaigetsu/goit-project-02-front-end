import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api.js';
import toast from 'react-hot-toast';

export const addCard = createAsyncThunk('addCard', async (data, thunkAPI) => {
  try {
    const response = await api.post('/tasks', data);

    toast.success('Card created successfully!', {
      duration: 3000,
      position: 'top-center',
      icon: '✔️',
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to create column: ' + error.message, {
      duration: 3000,
      position: 'top-center',
      icon: '❌',
    });
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteCard = createAsyncThunk(
  'deleteCard',
  async (cardId, thunkAPI) => {
    try {
      await api.delete(`/tasks/${cardId}`);
      toast.success('Card deleted!', {
        duration: 3000,
        position: 'top-center',
        icon: '✔️',
      });

      return { cardId };
    } catch (error) {
      toast.error('Failed to delete card: ' + error.message, {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCard = createAsyncThunk(
  'updateCard',
  async ({ _id, data }, thunkAPI) => {
    try {
      const response = await api.patch(`/tasks/${_id}`, data);
      toast.success('Card updated successfully!', {
        duration: 3000,
        position: 'top-center',
        icon: '✔️',
      });
      return response.data;
    } catch (error) {
      toast.error('Failed to update card: ' + error.message, {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
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

      toast.success('Card moved successfully!', {
        duration: 3000,
        position: 'top-center',
        icon: '✔️',
      });

      return response.data.data;
    } catch (error) {
      toast.error('Failed to move card: ' + error.message, {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


