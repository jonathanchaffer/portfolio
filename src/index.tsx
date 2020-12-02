import { App } from "components";
import { UserProvider } from "contexts";
import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import React from "react";
import ReactDOM from "react-dom";
import "styles/colors.scss";
import "styles/fonts.scss";
import "styles/index.scss";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
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
export const auth = firebase.auth();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
