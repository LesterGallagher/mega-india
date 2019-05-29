import { EventEmitter } from "events";
import firebase from '../lib/firebase';

class UserStore extends EventEmitter {
    constructor() {
        super();
    }

    checkIfUserDataExists = uid => {
        return new Promise((resolve, reject) => {
            firebase.ready.then(firebase => {
                const ref = firebase.database().ref(`/users/${uid}`);
                ref.once('value', function (snapshot) {
                    return resolve(snapshot.val() !== null);
                }, reject);
            }).catch(reject);
        });
    }
}

export default new UserStore();
