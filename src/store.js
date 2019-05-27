import { applyMiddleware, createStore, compose } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import firebase from 'firebase/app';

import reducer from './reducers';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

const rrfConfig = {
    userProfile: 'users',
};

const middleware = applyMiddleware(promise, thunk, logger);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

export default createStoreWithFirebase(reducer, middleware);
