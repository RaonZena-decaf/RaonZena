import { configureStore } from '@reduxjs/toolkit';
import userData from './userData';

export const store = configureStore({
  reducer: {userData}
});
