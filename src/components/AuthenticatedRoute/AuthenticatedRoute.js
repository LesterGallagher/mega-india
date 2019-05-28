import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppSplitter from "../AppSplitter/AppSplitter";
import { SIGN_IN } from "../../constants/routes";

export default ({ component: C, props: cProps, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            cProps.isAuthenticated
                ? <AppSplitter><C {...props} {...cProps} /></AppSplitter>
                : <Redirect
                    to={`${SIGN_IN}?redirect=${props.location.pathname}${props.location.search}`}
                />}
    />;