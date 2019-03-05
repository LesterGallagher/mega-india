import { EventEmitter } from "events";
import { authenticate, getCurrentUser, isLoggedIn, firebaseReady } from "../lib/authentication";

import { getProfileImage } from "../lib/user";

export const getUserObserver = async (uid) => {
    const firebase = await firebaseReady;
    return firebase.database().ref(`/users/${uid}`);
};

export const checkIfUserDataExists = uid => {
    return new Promise((resolve, reject) => {
        firebaseReady.then(firebase => {
            const ref = firebase.database().ref(`/users/${uid}`);
            ref.once('value', function (snapshot) {
                return resolve(snapshot.val() !== null);
            }, reject);
        }).catch(reject);
    });
};

const setUserData = (uid, userData, postFix) => {
    return new Promise((resolve, reject) => {
        firebaseReady.then(firebase => {
            const ref = firebase.database().ref(`/users/${uid}/${postFix}`);
            ref.set(userData);
        }).catch(reject);
    });
};

export const setPublicUserData = (uid, userData) => {
    console.log('setting public data');
    return setUserData(uid, userData, 'public');
};

export const setPrivateUserData = (uid, userData) => {
    return setUserData(uid, userData, 'private');
};

export const getUserDataRef = uid => {
    return new Promise((resolve, reject) => {
        firebaseReady.then(firebase => {
            const ref = firebase.database().ref(`/users/${uid}`);
            resolve(ref);
        }).catch(reject);
    });
}

class AuthStore extends EventEmitter {
    constructor() {
        super();

        this.isLoggedin = false;
        this.isReady = false;
        this.readyPromise = getCurrentUser().then(async user => {
            isLoggedIn().then(async loggedIn => {
                this.user = user;
                this.isLoggedin = loggedIn;
                this.isReady = true;
                if (this.user) await this.getUserInfo();
                this.emit('change');
            });
        });
    }

    authenticate = (provider) => authenticate(provider).then(async user => {
        this.isLoggedin = true;
        this.user = user;
        await this.getUserInfo();
        this.emit('change');
        return user;
    });

    getUserInfo = async () => {
        if (this.userDataObserver) this.userDataObserver.off();
        this.photoURL = await getProfileImage(this.user.uid);
        this.userDataObserver = await getUserObserver(this.user.uid);
        const userDataExists = await checkIfUserDataExists(this.user.uid);
        if (userDataExists === false) {
            await setPublicUserData(this.user.uid, {
                displayName: this.user.displayName || 'Anonymous'
            });
        }
        const snapshot = await this.userDataObserver.once('value')
        this.userData = snapshot.val();
        this.isReady = true;
        this.emit('change');
        this.userDataObserver.on('value', this.handleUserDataSnapshot);
    }

    handleUserDataSnapshot = snapshot => {
        this.userData = snapshot.val();
        this.emit('change');
    }

    setPhotoURL = photoURL => {
        this.photoURL = photoURL;
        this.emit('change');
    }
}

export default new AuthStore();
