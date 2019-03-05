import React, { Component } from 'react';
import { Page, CarouselItem, Card } from 'react-onsenui';
import styles from './Login.module.css';
import config from '../../../config';
import image from './image.png';
import { withRouter } from 'react-router-dom';
import { GoogleLoginButton } from "react-social-login-buttons";
import AuthStore from '../../../stores/AuthStore';
import { firebaseReady } from '../../../lib/authentication';
import firebase from 'firebase/app';

class Login extends Component {

    googleAuthenticate = () => {
        AuthStore.authenticate(new firebase.auth.GoogleAuthProvider());
    }

    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <div className={styles.loginButton}>
                    <img className={styles.img} src={image} alt="Login" />
                </div>
                <Card className={styles.card}>
                    <h3 className={styles.title}>Login/Registreren</h3>
                    <p>&nbsp;</p>
                    <GoogleLoginButton onClick={this.googleAuthenticate}>Login met Google</GoogleLoginButton>
                </Card>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(Login);
