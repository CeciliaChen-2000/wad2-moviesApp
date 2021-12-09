// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBtSeloT1TFjhALvsYdsvqTvp5i7WSW6T0",
  authDomain: "user-authentication-66ae2.firebaseapp.com",
  projectId: "user-authentication-66ae2",
  storageBucket: "user-authentication-66ae2.appspot.com",
  messagingSenderId: "708591172858",
  appId: "1:708591172858:web:71f1bea838d4a95409dd43"
};

firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebase.auth