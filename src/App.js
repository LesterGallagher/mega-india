import React, { Component } from 'react';
import logo from './logo.svg';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NewRouteOrder from './components/NewRouteOrder/NewRouteOrder';
import Home from './components/Home/Home';
import ons from 'onsenui';
import { Page, Toolbar, Button } from 'react-onsenui';
import PageRoutes from './components/PageRoutes/PageRoutes';
import NormalSplitter from './components/NormalSplitter/NormalSplitter';
import { firebaseReady } from './lib/authentication';
import AuthStore from './stores/AuthStore';
import PublicChatStore from './stores/PublicChatStore';
import Introduction from './components/Introduction/Introduction';
import Loading from './components/Loading/Loading';
import NoEntry from './components/NoEntry/NoEntry';

const isReady = () =>
  AuthStore.isReady
  && PublicChatStore.isReady

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReady: isReady(),
      isLoggedin: AuthStore.isLoggedin,
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
    if (this.state.isReady && this.state.isLoggedin === AuthStore.isLoggedin) return;
    this.setState({
      isReady: isReady(),
      isLoggedin: AuthStore.isLoggedin
    });
  }

  render() {

    return (
      <div className="App">
        <HashRouter>
          {this.state.isReady
            ? <div>
              {this.state.isLoggedin
                ? <NormalSplitter>
                  <PageRoutes />
                </NormalSplitter>
                : <Switch>
                  <Route exact path="/no-entry" component={NoEntry} />
                  <Route component={Introduction} />
                </Switch>}
            </div>
            : <Loading />}
        </HashRouter>
      </div>
    );
  }
}

export default App;
