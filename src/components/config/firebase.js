import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "piknik-zamani.firebaseapp.com",
  databaseURL: "https://piknik-zamani.firebaseio.com",
  projectId: "piknik-zamani",
  storageBucket: "piknik-zamani.appspot.com",
  messagingSenderId: "528088018277",
  appId: "1:528088018277:web:049c62408649c72983858c",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
