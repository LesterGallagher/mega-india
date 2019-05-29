import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './Routes.css';

import AppSplitter from '../AppSplitter/AppSplitter';
import Loader from '../Loader/Loader';
import AppliedRoute from "../AppliedRoute/AppliedRoute";
import UnauthenticatedRoute from '../UnauthenticatedRoute/UnauthenticatedRoute';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import asyncComponent from '../AsyncComponent/AsyncComponent';
import * as ROUTES from '../../constants/routes';

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
const AccountPage = asyncComponent(() => import('../AccountPage/AccountPage'));
const PersonalProfilePage = asyncComponent(() => import('../PersonalProfilePage/PersonalProfilePage'));
const ProfilePage = asyncComponent(() => import('../ProfilePage/ProfilePage'));
const FAQPage = asyncComponent(() => import('../FAQPage/FAQPage'));
const FAQQuestionPage = asyncComponent(() => import('../FAQPage/FAQQuestionPage/FAQQuestionPage'));

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
                <UnauthenticatedRoute exact path={ROUTES.SIGN_IN} component={Introduction} props={childProps} />
                <UnauthenticatedRoute exact path={ROUTES.NO_ENTRY} component={NoEntry} props={childProps} />

                <AuthenticatedRoute exact path={ROUTES.LANDING} component={Home} props={childProps} />
                <AuthenticatedRoute exact path={ROUTES.ACCOUNT} component={AccountPage} props={childProps} />
                <AuthenticatedRoute exact path={ROUTES.NEW_ROUTE} component={NewRouteOrder} props={childProps} />
                <AuthenticatedRoute exact path={ROUTES.ROUTES_LIST} component={RoutesOffersOverview} props={childProps} />
                <AuthenticatedRoute exact path={ROUTES.ROUTE_DETAIL} component={RouteDetail} props={childProps} />
                <AuthenticatedRoute exact path={ROUTES.PERSONAL_CHATS_OVERVIEW} component={PersonalChatsOverview} props={childProps} />

                <AuthenticatedRoute exact path={ROUTES.PERSONAL_PROFILE} component={PersonalProfilePage} props={childProps} />

                <AuthenticatedRoute
                    exact
                    path={ROUTES.PUBLIC_CHAT}
                    props={childProps}
                    component={PublicChat} />
                <AuthenticatedRoute
                    exact
                    path={ROUTES.PERSONAL_CHAT}
                    props={childProps}
                    component={PersonalChat} />

                <AuthenticatedRoute exact path={ROUTES.PROFILE} component={ProfilePage} props={childProps} />
                <AuthenticatedRoute exact path={ROUTES.FAQ} component={FAQPage} props={childProps} />
                <AuthenticatedRoute exact path={ROUTES.FAQ_QUESTION} component={FAQQuestionPage} props={childProps} />
                <AppliedRoute exact path="/flow/routeorder" component={RouteOfferFlowDiagram} />
                <AppliedRoute component={NotFound} />
            </Switch>
        );
    }
}

export default Routes;
