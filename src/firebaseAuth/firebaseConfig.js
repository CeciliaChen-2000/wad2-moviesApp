import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBtSeloT1TFjhALvsYdsvqTvp5i7WSW6T0",
    authDomain: "user-authentication-66ae2.firebaseapp.com",
    projectId: "user-authentication-66ae2",
    storageBucket: "user-authentication-66ae2.appspot.com",
    messagingSenderId: "708591172858",
    appId: "1:708591172858:web:71f1bea838d4a95409dd43",
    databaseURL: "https://user-authentication-66ae2.firebaseio.com",
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;