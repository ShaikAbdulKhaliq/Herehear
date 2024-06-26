import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbGtYsOEj3hbkEEk5xKrL-0LZkDKCCPDY",
  authDomain: "hearheremobileapp.firebaseapp.com",
  projectId: "hearheremobileapp",
  storageBucket: "hearheremobileapp.appspot.com",
  messagingSenderId: "356695765082",
  appId: "1:356695765082:web:27a4603f8e0febaa54e863",
  measurementId: "G-N4W0E2CH6Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
