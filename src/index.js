import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";
import * as serviceWorker from './serviceWorker';
import ons from 'onsenui';
import { register } from 'timeago.js';
import nlLocale from 'timeago.js/lib/lang/nl';
ons.platform.select('android');
register('nl', nlLocale);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
