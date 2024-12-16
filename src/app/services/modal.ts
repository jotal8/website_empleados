import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stateModal: 0,
  id: 0
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    SHOW: (state) => {
      state.stateModal = 1;
    },
    HIDE: (state) => {
      state.stateModal = 0;
    },
    setId: (state, action) => {
      state.id = action.payload;
    }
  }
});

export const { SHOW, HIDE, setId} = modalSlice.actions;

export default modalSlice.reducer;