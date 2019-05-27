import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_M3x8TONbKzPOyl7RYfZ1cvjZmWVvgv8",
    authDomain: "megaindia-990a4.firebaseapp.com",
    databaseURL: "https://megaindia-990a4.firebaseio.com",
    projectId: "megaindia-990a4",
    storageBucket: "megaindia-990a4.appspot.com",
    messagingSenderId: "429451926912"
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default firebase;
