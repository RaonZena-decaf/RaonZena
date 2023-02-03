import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userData from './userData';
import baseUrl from './baseUrl'

export const store = configureStore({
  reducer: combineReducers({
    userData,
    baseUrl,
  })
});
