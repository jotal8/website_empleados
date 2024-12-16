import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stateSession: +localStorage.getItem('stateSession') ? +localStorage.getItem('stateSession') : 0,
  token: localStorage.getItem('token') || null,
  rol: localStorage.getItem('rol') ? localStorage.getItem('rol') : '',
  name: localStorage.getItem('name') ? localStorage.getItem('name') : ''
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    LOGIN: (state) => {
      state.stateSession = 1;
      localStorage.setItem('stateSession', 1);
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
    setRol: (state, action) => {
      state.rol = action.payload;
      localStorage.setItem('rol', action.payload);
    },
    setName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem('name', action.payload);
    },
  },
});

export const { LOGIN, LOGOUT, setSession, setRol, setName } = sessionSlice.actions;

export default sessionSlice.reducer;