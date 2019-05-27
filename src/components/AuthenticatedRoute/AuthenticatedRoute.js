import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppSplitter from "../AppSplitter/AppSplitter";

export default ({ component: C, props: cProps, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            cProps.isAuthenticated
                ? <AppSplitter><C {...props} {...cProps} /></AppSplitter>
                : <Redirect
                    to={`/login?redirect=${props.location.pathname}${props.location
                        .search}`}
                />}
    />;