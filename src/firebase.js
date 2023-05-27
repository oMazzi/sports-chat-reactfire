// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeDsmFk4EjYMnot0F7uB_wn-zuK6a18Jk',
  authDomain: 'sports-chat-10d8e.firebaseapp.com',
  projectId: 'sports-chat-10d8e',
  storageBucket: 'sports-chat-10d8e.appspot.com',
  messagingSenderId: '158343213618',
  appId: '1:158343213618:web:6a75a62e96fe91251bc22b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
