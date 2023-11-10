// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase  } from "firebase/database";

// Configuracion Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjkJghgv0VNXJFwgyjM6__We1cFqYnW1s",
  authDomain: "birthday-b7c33.firebaseapp.com",
  databaseURL: "https://birthday-b7c33-default-rtdb.firebaseio.com",
  projectId: "birthday-b7c33",
  storageBucket: "birthday-b7c33.appspot.com",
  messagingSenderId: "298861317031",
  appId: "1:298861317031:web:c49523568c5b8a071dc482",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getDatabase (app);

