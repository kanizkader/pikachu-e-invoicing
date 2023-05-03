import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit'; 
import authSlice from './reducers/authSlice';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

Kommunicate.init("17d3bf9323acb16e50868606745d27579", false, false)

// Create Redux store
const store = configureStore({
  reducer: {
    auth: authSlice, // Add authReducer to the reducer object
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Wrap App component with Provider to provide Redux store
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
