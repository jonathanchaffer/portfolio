import { App } from "components";
import * as firebase from "firebase";
import "firebase/analytics";
import React from "react";
import ReactDOM from "react-dom";
import "styles/index.scss";

const firebaseConfig = {
  apiKey: "AIzaSyDVq652UxsUYrGfFFjUnVb3tTVLfOnhA6s",
  appId: "1:164660222638:web:0fefa831d0eb1758742b3f",
  authDomain: "jonathanchaffer-portfolio.firebaseapp.com",
  databaseURL: "https://jonathanchaffer-portfolio.firebaseio.com",
  measurementId: "G-9B9P1N84DV",
  messagingSenderId: "164660222638",
  projectId: "jonathanchaffer-portfolio",
  storageBucket: "jonathanchaffer-portfolio.appspot.com",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
export const storageRef = firebase.storage().ref();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
