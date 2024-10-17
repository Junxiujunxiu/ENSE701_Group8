// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC05Qnwo1VvhTefsbNY1aava9TPHeauvz0',
  authDomain: 'speed-50ee1.firebaseapp.com',
  projectId: 'speed-50ee1',
  storageBucket: 'speed-50ee1.appspot.com',
  messagingSenderId: '83357140976',
  appId: '1:83357140976:web:d2e8a947a853a5f3d4bf35',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
