import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NewRouteOrder from '../NewRouteOrder/NewRouteOrder';
import Home from '../Home/Home';
import RoutesList from '../RoutesList/RoutesList';
import RoutesOffersOverview from '../RoutesOffersOverview/RoutesOffersOverview';
import RouteDetail from '../RouteDetail/RouteDetail';
import PublicChat from '../PublicChat/PublicChat';
import PersonalChat from '../PersonalChat/PersonalChat';
import PersonalChatsOverview from '../PersonalChatsOverview/PersonalChatsOverview';

class PageRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            <Route path="/" component={Home} exact />
            <Route path="/new-route" component={NewRouteOrder} exact />
            <Route path="/routes-list" component={RoutesOffersOverview} exact />
            <Route path="/route/:id" component={RouteDetail} exact />
            <Route exact path="/chats/personal" component={PersonalChatsOverview} />
            <Route
                exact
                path="/chats/public/*"
                render={props => <PublicChat {...props} />}/>
            <Route
                exact
                path="/chats/personal/*"
                render={props => <PersonalChat {...props} />}/>

            
        </div>);
    }
}

export default PageRoutes;