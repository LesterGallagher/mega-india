import { EventEmitter } from "events";
import { authenticate, getCurrentUser, isLoggedIn, firebaseReady } from "../lib/authentication";

import { getProfileImage } from "../lib/user";
import AuthStore from "./AuthStore";

class UserStore extends EventEmitter {
    constructor() {
        super();
    }

    checkIfUserDataExists = uid => {
        return new Promise((resolve, reject) => {
            firebaseReady.then(firebase => {
                const ref = firebase.database().ref(`/users/${uid}`);
                ref.once('value', function (snapshot) {
                    return resolve(snapshot.val() !== null);
                }, reject);
            }).catch(reject);
        });
    }
}

export default new UserStore();
