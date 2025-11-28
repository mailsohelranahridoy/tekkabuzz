import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDvsg9vftzt4g-0icivo67m4UnGTUGXK1s",
  authDomain: "tekkabuzz--in.firebaseapp.com",
  databaseURL: "https://tekkabuzz--in-default-rtdb.firebaseio.com",
  projectId: "tekkabuzz--in",
  storageBucket: "tekkabuzz--in.firebasestorage.app",
  messagingSenderId: "1004348001740",
  appId: "1:1004348001740:web:c51b2df696663e7df5a169",
  measurementId: "G-BX9NVCMBBC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
