import app from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { deviceReady } from './util';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_M3x8TONbKzPOyl7RYfZ1cvjZmWVvgv8",
    authDomain: "megaindia-990a4.firebaseapp.com",
    databaseURL: "https://megaindia-990a4.firebaseio.com",
    projectId: "megaindia-990a4",
    storageBucket: "megaindia-990a4.appspot.com",
    messagingSenderId: "429451926912"
};

const ready = async self => {
    await app.auth().setPersistence(app.auth.Auth.Persistence.LOCAL)
    await deviceReady;
    return self;
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth;
        this.database = app.database;
        this.firestore = app.firestore;
        this.storage = app.storage;
        this.ready = ready(this);
    }

}

export default new Firebase();