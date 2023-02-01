import { configureStore } from '@reduxjs/toolkit';
import userData from './userData';
import openvidu from './openvidu'

export const store = configureStore({
  reducer: {
    openvidu,
    userData
  }
});
