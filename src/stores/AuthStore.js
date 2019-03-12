import { EventEmitter } from "events";
import { authenticate, getCurrentUser, isLoggedIn, firebaseReady } from "../lib/authentication";
import { getProfileImage } from "../lib/user";
import UserStore from "./UserStore";
import firebase from 'firebase/app';

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
        await firebaseReady;
        this.photoURL = await getProfileImage(this.user.uid);
        this.userDataObserver = firebase.database().ref(`/users/${this.user.uid}`)
        const userDataExists = await UserStore.checkIfUserDataExists(this.user.uid);
        if (userDataExists === false) {
            const ref = firebase.database().ref(`/users/${this.user.uid}/public`);
            await ref.set({
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
