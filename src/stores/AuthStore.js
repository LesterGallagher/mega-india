import { EventEmitter } from "events";
import { authenticate, getCurrentUser, isLoggedIn } from "../services/authentication";
import { getProfileImage } from "../lib/user";
import UserStore from "./UserStore";
import ons from 'onsenui';
import firebase from '../lib/firebase';

class AuthStore extends EventEmitter {
    constructor() {
        super();

        this.isAuthenticated = false;
        this.userHasAuthenticated = false;
        this.readyPromise = this.getUser();
    }

    loginWithEmailPassword = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            ons.notification.alert('Unable to login: ' + errorMessage);
        }
        await this.getUser();

    }

    registerWithEmailPassword = async (email, password) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            ons.notification.alert('Unable to login: ' + errorMessage);
        }
        await this.getUser();
    }

    signInAnonymously = async () => {
        try {
            await firebase.auth().signInAnonymously();
        } catch (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            ons.notification.alert('Unable to sign in: ' + errorMessage);
        }
        await this.getUser();
    }

    signInWithGoogle = async () => {
        try {
            const firebase = await firebase.ready();
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider)
        } catch(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            ons.notification.alert('Unable to login: ' + errorMessage);
        }
    }

    getUser = async () => {
        const user = await getCurrentUser();
        if (!user) console.warn('user is falsy after getting the current user...', user);
        const loggedIn = await isLoggedIn();
        this.user = user;
        this.isAuthenticated = loggedIn;
        this.userHasAuthenticated = true;
        if (this.user) await this.getUserInfo();
        this.emit('change', { action: 'GET_USER' });
    }

    authenticate = provider => authenticate(provider).then(async user => {
        if (!user) console.warn('user is falsy after authenticating...', user);
        this.isAuthenticated = true;
        this.user = user;
        await this.getUserInfo();
        this.emit('change');
        return user;
    });

    getUserInfo = async () => {
        if (this.userDataObserver) this.userDataObserver.off();
        await firebase.ready;
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
        this.userHasAuthenticated = true;
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
