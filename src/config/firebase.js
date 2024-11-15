import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOM,
  projectId: process.env.PROJ_ID,
  storageBucket: process.env.STRGE_BUCK,
  messagingSenderId: process.env.MESS_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEAS_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();