import React, { Component } from 'react';
import ons from 'onsenui';
import { register } from 'timeago.js';
import nlLocale from 'timeago.js/lib/lang/nl';
import { HashRouter } from 'react-router-dom';
import '../../lib/firebase';
import './App.css';
import AuthStore from '../../stores/AuthStore';
import PublicChatStore from '../../stores/PublicChatStore';
import Loading from '../Loading/Loading';
import Routes from '../Routes/Routes';
import 'onsenui/css/onsenui.css';
import '../../onsen-css-theme/onsen-css-components.css'
import { Provider } from 'react-redux';
import store from '../../store';
console.log(store);

ons.platform.select('android');
register('nl', nlLocale);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: AuthStore.isAuthenticated,
      userHasAuthenticated: AuthStore.userHasAuthenticated,
      user: AuthStore.user
    };

    AuthStore.on('change', this.handleAnyStoreChange);
    PublicChatStore.on('change', this.handleAnyStoreChange);
  }

  componentWillUnmount() {
    AuthStore.removeListener('change', this.handleAnyStoreChange);
    PublicChatStore.removeListener('change', this.handleAnyStoreChange);
  }

  handleAnyStoreChange = () => {
    if (this.state.userHasAuthenticated !== AuthStore.userHasAuthenticated
      || this.state.isAuthenticated !== AuthStore.isAuthenticated) {

      this.setState({
        userHasAuthenticated: AuthStore.userHasAuthenticated,
        isAuthenticated: AuthStore.isAuthenticated
      });
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.state.userHasAuthenticated
    };

    console.log('child props', childProps);

    return (
      <Provider store={store}>
        <div className="App">
          {this.state.userHasAuthenticated ? <HashRouter>
            <Routes childProps={childProps} />
          </HashRouter> : <Loading />}
        </div>
      </Provider>
    );
  }
}

export default App;
