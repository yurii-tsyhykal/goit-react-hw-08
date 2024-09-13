import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout, userRefresh, userRegister } from './operation';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(userRegister.pending, state => {
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userLogin.pending, state => {
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userLogout.pending, state => {
        state.error = null;
      })
      .addCase(userLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userRefresh.pending, state => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(userRefresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(userRefresh.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      }),
});

export const authReducer = AuthSlice.reducer;
