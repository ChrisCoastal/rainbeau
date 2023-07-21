import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env!.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env!.REACT_APP_FIREBASE_API_AUTH,
  projectId: process.env!.REACT_APP_FIREBASE_API_PROJ_ID,
  storageBucket: process.env!.REACT_APP_FIREBASE_API_STORE,
  messagingSenderId: process.env!.REACT_APP_FIREBASE_API_SEND,
  appId: process.env!.REACT_APP_FIREBASE_API_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const functions = getFunctions(app, 'us-central1');
