import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const firebaseConfig = {
  apiKey: 'AIzaSyCeDsmFk4EjYMnot0F7uB_wn-zuK6a18Jk',
  authDomain: 'sports-chat-10d8e.firebaseapp.com',
  projectId: 'sports-chat-10d8e',
  storageBucket: 'sports-chat-10d8e.appspot.com',
  messagingSenderId: '158343213618',
  appId: '1:158343213618:web:6a75a62e96fe91251bc22b',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
);
