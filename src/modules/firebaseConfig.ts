import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

firebase.initializeApp( {
  apiKey: "AIzaSyD52046JmWnAPGaSn1x9s-fY6y4Oi6PYas",
  authDomain: "happyappback.firebaseapp.com",
  projectId: "happyappback",
  storageBucket: "happyappback.firebasestorage.app",
  messagingSenderId: "764495429283",
  appId: "1:764495429283:web:d9d1018448d13ae0bf0916",
  measurementId: "G-YJF1YDHD18"
});

// Initialize Firebase
const firestore = firebase.firestore();

export { firestore };