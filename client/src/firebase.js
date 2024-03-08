// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_API_KEY,
  authDomain: "mern-auth-b5fe8.firebaseapp.com",
  projectId: "mern-auth-b5fe8",
  storageBucket: "mern-auth-b5fe8.appspot.com",
  messagingSenderId: "1066060528339",
  appId: "1:1066060528339:web:390bd6b8d0f0de54a2b226"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);