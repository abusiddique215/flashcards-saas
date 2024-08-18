// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcXaWoZ2Wuz0CQWS60q_viLRQTDnOWXr8",
  authDomain: "flashai-app-3fe32.firebaseapp.com",
  projectId: "flashai-app-3fe32",
  storageBucket: "flashai-app-3fe32.appspot.com",
  messagingSenderId: "240894073352",
  appId: "1:240894073352:web:b5a06e2d1917dd1eb28fbd",
  measurementId: "G-V90WMNK9TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);