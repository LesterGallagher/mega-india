import React, { Component } from 'react';
import './EmailLoginButton.css';
import { createButton } from "react-social-login-buttons";

const config = {
    text: "Login with Facebook",
    icon: "envelope",
    iconFormat: name => `fa fa-${name}`,
    style: { background: "#757575" },
    activeStyle: { background: "#858585" }
};
/** My Facebook login button. */
const MyEmailLoginButton = createButton(config);

export default MyEmailLoginButton;