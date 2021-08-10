import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/firestore';



firebase.initializeApp({
  apiKey: "AIzaSyAR6gsYPFqcSgROREafqXybQuD2U9R9kZo",
  authDomain: "cart-cc838.firebaseapp.com",
  projectId: "cart-cc838",
  storageBucket: "cart-cc838.appspot.com",
  messagingSenderId: "807104478489",
  appId: "1:807104478489:web:431772b9ea04cdfd795988"
});
// Initialize Firebase



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
