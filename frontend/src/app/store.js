import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";
import userData from "./userData";
import baseUrl from "./baseUrl";
import redirectUrl from "./redirectUrl";
import myFollowingList from "./myFollowingList";

const persistConfig = {
  key: "root",
  storage : sessionStorage,
  whitelist: ["userData", "myFollowingList"],
};

const rootReducer = combineReducers({
  userData,
  baseUrl,
  redirectUrl,
  myFollowingList,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
