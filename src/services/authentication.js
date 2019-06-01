import firebase from '../lib/firebase';

export const getCurrentUser = () => firebase.ready.then(firebase => {
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
export const authenticate = async provider => {
    if (!provider) provider = new firebase.auth.GoogleAuthProvider();
    const user = await getCurrentUser();
    if (user) {
        return user;
    }
    else {
        return await firebase.auth().signInWithRedirect(provider);
    }

};

export const doCreateUserWithEmailAndPassword = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

export const doSignOut = () => firebase.auth().signOut();

export const doPasswordReset = email => firebase.auth().sendPasswordResetEmail(email);

export const doPasswordUpdate = password =>
    firebase.auth().currentUser.updatePassword(password);



