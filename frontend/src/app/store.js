import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userData from './userData';
import baseUrl from './baseUrl'
import redirectUrl from './redirectUrl';
import myFollowingList from './myFollowingList';


export const store = configureStore({
  reducer: combineReducers({
    userData,
    baseUrl,
    redirectUrl,
    myFollowingList,
  })
});
