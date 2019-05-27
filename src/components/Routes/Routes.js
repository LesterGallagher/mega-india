import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './Routes.css';

import AppSplitter from '../AppSplitter/AppSplitter';
import Loader from '../Loader/Loader';
import AppliedRoute from "../AppliedRoute/AppliedRoute";
import UnauthenticatedRoute from '../UnauthenticatedRoute/UnauthenticatedRoute';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import asyncComponent from '../AsyncComponent/AsyncComponent';

// import Introduction from '../Introduction/Introduction';
// import NoEntry from '../NoEntry/NoEntry';
// import NewRouteOrder from '../NewRouteOrder/NewRouteOrder';
// import Home from '../Home/Home';
// import RoutesOffersOverview from '../RoutesOffersOverview/RoutesOffersOverview';
// import RouteDetail from '../RouteDetail/RouteDetail';
// import PublicChat from '../PublicChat/PublicChat';
// import PersonalChat from '../PersonalChat/PersonalChat';
// import PersonalChatsOverview from '../PersonalChatsOverview/PersonalChatsOverview';
// import NotFound from '../NotFound/NotFound';
// import RouteOfferFlowDiagram from '../RouteOfferFlowDiagram/RouteOfferFlowDiagram';

const Introduction = asyncComponent(() => import('../Introduction/Introduction'));
const NoEntry = asyncComponent(() => import('../NoEntry/NoEntry'));
const NewRouteOrder = asyncComponent(() => import('../NewRouteOrder/NewRouteOrder'));
const Home = asyncComponent(() => import('../Home/Home'));
const RoutesOffersOverview = asyncComponent(() => import('../RoutesOffersOverview/RoutesOffersOverview'));
const RouteDetail = asyncComponent(() => import('../RouteDetail/RouteDetail'));
const PublicChat = asyncComponent(() => import('../PublicChat/PublicChat'));
const PersonalChat = asyncComponent(() => import('../PersonalChat/PersonalChat'));
const PersonalChatsOverview = asyncComponent(() => import('../PersonalChatsOverview/PersonalChatsOverview'));
const NotFound = asyncComponent(() => import('../NotFound/NotFound'));
const RouteOfferFlowDiagram = asyncComponent(() => import('../RouteOfferFlowDiagram/RouteOfferFlowDiagram'));
const ESStudioFeed = asyncComponent(() => import('../ESStudioFeed/ESStudioFeed'));

class Routes extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { childProps } = this.props;
        console.log(childProps);
        return (
            <Switch>
                {/* {this.state.userHasAuthenticated
                    ? <div>
                        {this.state.isAuthenticated
                            ? <AppSplitter>
                                <PageRoutes />
                            </AppSplitter>
                            : <Switch>
                                <Route exact path="/no-entry" component={NoEntry} />
                                <Route component={Introduction} />
                            </Switch>}
                    </div>
                    : <Loading />}
                Routes Component */}

                <UnauthenticatedRoute exact path="/login" component={Introduction} props={childProps} />
                <UnauthenticatedRoute exact path="/no-entry" component={NoEntry} props={childProps} />

                <AuthenticatedRoute exact path="/" component={Home} props={childProps} />
                <AuthenticatedRoute exact path="/new-route" component={NewRouteOrder} props={childProps} />
                <AuthenticatedRoute exact path="/routes-list" component={RoutesOffersOverview} props={childProps} />
                <AuthenticatedRoute exact path="/route/:id" component={RouteDetail} props={childProps} />
                <AuthenticatedRoute exact path="/chats/personal" component={PersonalChatsOverview} props={childProps} />
                <AuthenticatedRoute
                    exact
                    path="/chats/public/*"
                    props={childProps}
                    component={PublicChat} />
                <AuthenticatedRoute
                    exact
                    path="/chats/personal/*"
                    props={childProps}
                    component={PersonalChat} />

                <AppliedRoute exact path="/flow/routeorder" component={RouteOfferFlowDiagram} />
                <AppliedRoute exact path="/feeds" component={ESStudioFeed} />
                <AppliedRoute component={NotFound} />
            </Switch>
        );
    }
}

export default Routes;
