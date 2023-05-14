// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYhfPcmLJPKWKCq-rB3SN6mqnEC6UlS0c",
  authDomain: "chatapp-84b63.firebaseapp.com",
  projectId: "chatapp-84b63",
  storageBucket: "chatapp-84b63.appspot.com",
  messagingSenderId: "589529352787",
  appId: "1:589529352787:web:1a5c77e7825f5cc74494a6",
  measurementId: "G-T2Z257P99Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
