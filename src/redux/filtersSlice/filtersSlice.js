import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  name: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: INITIAL_STATE,
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
export const selectNameFilter = state => state.filters.name;
