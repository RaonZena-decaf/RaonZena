import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userData from './userData';
import baseUrl from './baseUrl'
import redirectUrl from './redirectUrl';


export const store = configureStore({
  reducer: combineReducers({
    userData,
    baseUrl,
    redirectUrl,
  })
});
