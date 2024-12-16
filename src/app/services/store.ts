import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import modalReducer from './modal';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    modal: modalReducer
  },
});

export default store;