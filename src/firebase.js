import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAvS4RW44Q1DaaKByDylXjPfkY3a6t0YEQ",
  authDomain: "wastapp-clone-d5edb.firebaseapp.com",
  projectId: "wastapp-clone-d5edb",
  storageBucket: "wastapp-clone-d5edb.appspot.com",
  messagingSenderId: "845753111334",
  appId: "1:845753111334:web:6bc92626fe35515a01e7e7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
