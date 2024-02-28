// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZbpen0frlu7kXe1MiAz4GMFGNpJ2hYs4",
  authDomain: "e-bazar-afc3c.firebaseapp.com",
  projectId: "e-bazar-afc3c",
  storageBucket: "e-bazar-afc3c.appspot.com",
  messagingSenderId: "1069442972150",
  appId: "1:1069442972150:web:100cbd180e9b20299a6fd7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;