import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

const setAuthHeders = token => {
  apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const userRegister = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      console.log('userdata', userData);

      const { data } = await apiInstance.post('users/signup', userData);
      setAuthHeders(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const { data } = await apiInstance.post('users/login', userData);
      setAuthHeders(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await apiInstance.post('/users/logout');
      setAuthHeders('');
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userRefresh = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthHeders(token);

      const { data } = await apiInstance('users/current');

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;

      if (token) return true;

      return false;
    },
  }
);
