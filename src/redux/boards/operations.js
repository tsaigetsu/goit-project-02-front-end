import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api.js';

export const fetchBoardsThunk = createAsyncThunk(
  'fetchBoards',
  async (_, thunkApi) => {
    try {
      const response = await api.get('boards');

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addBoardsThunk = createAsyncThunk(
  'addBoard',
  async (body, thunkApi) => {
    try {
      const response = await api.post('boards', body); // const response = await api.post('/boards', body);

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteBoardThunk = createAsyncThunk(
  'deleteBoard',
  async (_id, thunkApi) => {
    try {
      await api.delete(`boards/${_id}`);
      return _id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getBoardByIdThunk = createAsyncThunk(
  'boards/getBoardById',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.get(`boards/${boardId}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBoardThunk = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, title, iconId, backgroundId }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`boards/${boardId}`, {
        title,
        iconId,
        backgroundId,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update board');
    }
  }
);

export const filterCardsByPriorityThunk = createAsyncThunk(
  'boards/filterCardsByPriority',
  async ({ boardId, priority }, { getState }) => {
    const state = getState();
    const board = state.boards.boards.find(b => b._id === boardId);

    if (!board || !board.columns) return [];

    const filteredBoard = board.columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(
        task => priority === null || task.priority === priority
      ),
    }));

    return { boardId, filteredBoard };
  }
);
