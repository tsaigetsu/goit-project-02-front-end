import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api.js';
// import { loginThunk } from '../auth/operations.js';

// export const fetchBoardsThunk = createAsyncThunk(
//   'fetchBoards',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       // Получаем токен из состояния Redux (или из localStorage)
//       const token = getState().auth.token; // Получаем токен из Redux
//       if (!token) {
//         return rejectWithValue('No token found'); // Если токен отсутствует, отклоняем запрос
//       }

//       // Отправляем запрос на сервер с токеном в заголовке
//       const response = await api.get('boards', {
//         headers: {
//           Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
//         },
//       });

//       console.log('response boards', response);
//       return response.data.data; // Возвращаем данные о бордах
//     } catch (error) {
//       console.error('Error fetching boards:', error);
//       return rejectWithValue(error.response?.data || 'Failed to fetch boards'); // Обрабатываем ошибку
//     }
//   }
// );

export const fetchBoardsThunk = createAsyncThunk(
  'fetchBoards',
  async (_, thunkApi) => {
    try {
      console.log('fetchBoardsThunk');

      const response = await api.get('boards');
      console.log('response boards', response);

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const addBoardsThunk = createAsyncThunk(
//   'addBoard',
//   async (body, thunkApi) => {
//     try {
//       const token = thunkApi.getState().auth.token; // Получаем токен из состояния Redux
//       if (!token) {
//         return thunkApi.rejectWithValue('No token found'); // Если токен отсутствует, отклоняем запрос
//       }

//       // Добавляем токен в заголовок Authorization
//       const response = await api.post('/boards', body, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Добавляем токен в заголовок запроса
//         },
//       });

//       console.log('response.data.data', response.data.data); // Логируем ответ с бордами

//       return response.data.data; // Возвращаем данные борда
//     } catch (error) {
//       console.error('Error in adding board:', error);
//       return thunkApi.rejectWithValue(error.message); // Обрабатываем ошибку
//     }
//   }
// );

export const addBoardsThunk = createAsyncThunk(
  'addBoard',
  async (body, thunkApi) => {
    console.log('newBoard', body);

    try {
      const response = await api.post('boards', body); // const response = await api.post('/boards', body);
      console.log('AddBoard', response.data.data);

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// export const deleteBoardThunk = createAsyncThunk(
//   'deleteBoard',
//   async (_id, { getState, rejectWithValue }) => {
//     try {
//       // Получаем токен из состояния Redux (или из localStorage)
//       const token = getState().auth.token; // Получаем токен из Redux
//       if (!token) {
//         return rejectWithValue('No token found'); // Если токен отсутствует, отклоняем запрос
//       }

//       // Добавляем токен в заголовок Authorization
//       await api.delete(`boards/${_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
//         },
//       });

//       return _id; // Возвращаем ID удаленного борда
//     } catch (error) {
//       console.error('Error deleting board:', error);
//       return rejectWithValue(error.response?.data || 'Failed to delete board'); // Обрабатываем ошибку
//     }
//   }
// );

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

// export const getBoardByIdThunk = createAsyncThunk(
//   'boards/getBoardById',
//   async (boardId, { getState, rejectWithValue }) => {
//     try {
//       // Получаем токен из состояния Redux (или localStorage, если нужно)
//       const token = getState().auth.token; // Получаем токен из Redux
//       if (!token) {
//         return rejectWithValue('No token found'); // Если токен отсутствует, отклоняем запрос
//       }

//       // Добавляем токен в заголовок Authorization
//       const response = await api.get(`boards/${boardId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
//         },
//       });

//       return response.data.data; // Возвращаем данные борда
//     } catch (error) {
//       console.error('Error fetching board:', error);
//       return rejectWithValue(error.response?.data || error.message); // Обрабатываем ошибку
//     }
//   }
// );

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

// export const updateBoardThunk = createAsyncThunk(
//   'boards/updateBoard',
//   async (
//     { boardId, title, iconId, backgroundId },
//     { getState, rejectWithValue }
//   ) => {
//     try {
//       // Получаем токен из состояния Redux (или localStorage, если нужно)
//       const token = getState().auth.token; // Получаем токен из Redux
//       if (!token) {
//         return rejectWithValue('No token found'); // Если токен отсутствует, отклоняем запрос
//       }

//       // Добавляем токен в заголовок Authorization
//       const response = await api.patch(
//         `boards/${boardId}`,
//         { title, iconId, backgroundId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
//           },
//         }
//       );

//       return response.data.data; // Возвращаем обновленные данные борда
//     } catch (error) {
//       console.error('Error updating board:', error);
//       return rejectWithValue(error.response?.data || 'Failed to update board'); // Обрабатываем ошибку
//     }
//   }
// );

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
