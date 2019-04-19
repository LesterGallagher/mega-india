import React, { Component } from 'react';
import './AnonymousLoginButton.module.css';
import { createButton } from "react-social-login-buttons";

const config = {
    text: "Anonieme Login",
    icon: "user",
    iconFormat: name => `fa fa-${name}`,
    style: { background: "#757575" },
    activeStyle: { background: "#858585" }
};
/** My Facebook login button. */
const AnonymousLoginButton = createButton(config);

export default AnonymousLoginButton;