import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stateSession: localStorage.getItem('stateSession') ? JSON.parse(localStorage.getItem('stateSession')) : 0,
  token: localStorage.getItem('token') || null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    LOGIN: (state) => {
      state.stateSession = 1;
      localStorage.setItem('stateSession', JSON.stringify(1));
    },
    LOGOUT: (state) => {
      state.stateSession = 0;
      state.token = null;
      localStorage.removeItem('stateSession');
      localStorage.removeItem('token');  
    },
    setSession: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const { LOGIN, LOGOUT, setSession } = sessionSlice.actions;

export default sessionSlice.reducer;