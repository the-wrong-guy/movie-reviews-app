// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnyWADduQ3N3IGOlzOHxCfNXcQ_k06al0",
  authDomain: "movie-app-66bcb.firebaseapp.com",
  projectId: "movie-app-66bcb",
  storageBucket: "movie-app-66bcb.appspot.com",
  messagingSenderId: "213812759610",
  appId: "1:213812759610:web:21eaaf85d93a642303b903",
  measurementId: "G-GGXPEWEZRC",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
