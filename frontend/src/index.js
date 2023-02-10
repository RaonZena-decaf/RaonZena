import React from 'react';
import ReactDOM from 'react-dom/client';
import "./global.css"
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'))
const persistor = persistStore(store)

// import reportWebVitals from './reportWebVitals';

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
