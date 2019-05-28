import React from "react";
import { Route, Redirect } from "react-router-dom";
import queryString from 'query-string';

export default ({ component: C, props: cProps, ...rest }) => {
    const hashQuery = window.location.href.split('?')[1];
    console.log(hashQuery, queryString.parse(hashQuery))
    const redirect = queryString.parse(hashQuery).redirect || null;
    console.log('redirect', redirect);
    return (
      <Route
        {...rest}
        render={props =>
          !cProps.isAuthenticated
            ? <C {...props} {...cProps} />
            : <Redirect
                to={redirect === "" || redirect === null ? "/" : redirect}
              />}
      />
    );
  };