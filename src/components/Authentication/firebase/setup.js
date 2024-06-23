import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6jRJlmW2sF4z-qkiSb0oOty5hzwpldSM",
  authDomain: "gaianhearhere.firebaseapp.com",
  projectId: "gaianhearhere",
  storageBucket: "gaianhearhere.appspot.com",
  messagingSenderId: "303151237068",
  appId: "1:303151237068:web:333de673c2482fb4467f69",
  measurementId: "G-33WHY4HBE8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
