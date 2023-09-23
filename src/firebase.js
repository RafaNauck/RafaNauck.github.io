//import 'firebase/store'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvzjPLbD18plfufaHOoUf-OND1vp5Ive4",
  authDomain: "trabalhosomativa2.firebaseapp.com",
  projectId: "trabalhosomativa2",
  storageBucket: "trabalhosomativa2.appspot.com",
  messagingSenderId: "984177732162",
  appId: "1:984177732162:web:4f6f8287fabc212b679bdb",
  measurementId: "G-3SMBXH5TEJ"
  };

  if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig)
   var db = firebase.firestore();
  }

  export default firebase;