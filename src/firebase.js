import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDwFDcclWId7L5xj94Z-fns-Qypwz_05vs",
  authDomain: "keatingauto-7780c.firebaseapp.com",
  databaseURL: "https://keatingauto-7780c.firebaseio.com",
  projectId: "keatingauto-7780c",
  storageBucket: "",
  messagingSenderId: "626178688872",
}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const formResults = databaseRef.child("formResults")