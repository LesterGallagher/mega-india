import { combineReducers } from 'redux';

import { firestoreReducer as firestore } from 'redux-firestore'
import { firebaseReducer as firebase } from 'react-redux-firebase'


import tweets from './tweets-reducer.js';
import feeds from './feeds-reducer.js';

export default combineReducers({
    tweets,
    feeds,
    firestore,
    firebase
});
