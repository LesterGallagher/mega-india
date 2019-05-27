import firebase from 'firebase/app';

import * as ons from 'onsenui';
import { deviceReady } from '../lib/util';

window.firebase  = firebase;

export const firebaseReady = (async () => {
    await deviceReady;
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    return firebase;
})();

export const getCurrentUser = () => firebaseReady.then(firebase => {
    console.log(firebase.auth().currentUser);
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
        console.log('if user', user);
        if (user) {
            resolve(user);
        }
        else {
            console.log('if user', user);
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                return firebase.auth().getRedirectResult();
            }).then(result => {
                console.log('if (result.credential) {', result.credential);
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
                        console.log('result', result);
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





