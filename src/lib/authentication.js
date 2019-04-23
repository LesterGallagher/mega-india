import firebase from 'firebase/app';
import * as ons from 'onsenui';
import { deviceReady } from './util';

export const firebaseReady = deviceReady.then(() => {
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
    return firebase;
});

export const getCurrentUser = () => firebaseReady.then(firebase => {
    if (firebase.auth().currentUser === null) {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(function (user) {
                resolve(user);
            });
        })
    } else {
        return firebase.auth().currentUser;
    }
});

export const isLoggedIn = () => getCurrentUser().then(user => {
    return !!user;
})

// default authenticate flow
export const authenticate = provider => new Promise((resolve, reject) => {
    if (!provider) provider = new firebase.auth.GoogleAuthProvider();
    getCurrentUser().then(user => {
        if (user) {
            resolve(user);
        }
        else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                return firebase.auth().getRedirectResult();
            }).then(result => {
                if (result.credential) {
                    // This gives you a Google Access Token.
                    // You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    resolve(result);
                } else {
                    firebase.auth().signInWithRedirect(provider).then(() => {
                        return firebase.auth().getRedirectResult();
                    }).then(result => {
                        // This gives you a Google Access Token.
                        // You can use it to access the Google API.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;
                        // ...
                        resolve(result);
                    }).catch(error => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        reject(error);
                    });
                }
            }).catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                reject(error);
            });
        }
    });

});





