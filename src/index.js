import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import asyncComponent from './components/AsyncComponent/AsyncComponent';
import Loading from './components/Loading/Loading';
import './style';
const App = asyncComponent(() => import('./components/App/App'), Loading);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
