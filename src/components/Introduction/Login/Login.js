import React, { Component } from 'react';
import { Page, CarouselItem, Card } from 'react-onsenui';
import styles from './Login.module.css';
import config from '../../../config';
import image from './image.png';
import { withRouter } from 'react-router-dom';
import { GoogleLoginButton, FacebookLoginButton, TwitterLoginButton } from "react-social-login-buttons";
import AuthStore from '../../../stores/AuthStore';
import firebase from '../../../lib/firebase';
import MyEmailLoginButton from '../../EmailLoginButton/EmailLoginButton';
import LoginWithEmail from './LoginWithEmail/LoginWithEmail';
import AnonymousLoginButton from '../../AnonymousLoginButton/AnonymousLoginButton';
import Loading from '../../Loading/Loading';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    googleAuthenticate = () => {
        this.setState({ loading: true });
        AuthStore.authenticate(new firebase.auth.GoogleAuthProvider());
        this.setState({ loading: false });
    }

    mailAuthenticate = () => {
        this.setState({
            email: true
        });
    }

    mailAuthenticateBack = () => {
        this.setState({
            email: false
        });
    }

    signInAnonymously = async () => {
        this.setState({ loading: true });
        await AuthStore.signInAnonymously();
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) return <Loading />
        if (this.state.email) return <LoginWithEmail onBack={this.mailAuthenticateBack} />
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <div className={styles.loginButton}>
                    <img className={styles.img} src={image} alt="Login" />
                </div>
                <Card className={styles.card}>
                    <h3 className={styles.title}>Login/Registreren</h3>
                    <p>&nbsp;</p>
                    <MyEmailLoginButton onClick={this.mailAuthenticate}>Login/Registreren met Email</MyEmailLoginButton>
                    <div style={{ padding: 1 }}></div>
                    <GoogleLoginButton onClick={this.googleAuthenticate}>Login met Google</GoogleLoginButton>
                    <div style={{ padding: 1 }}></div>
                    <FacebookLoginButton>Werkt nog niet</FacebookLoginButton>
                    <div style={{ padding: 1 }}></div>
                    <TwitterLoginButton>Werkt nog niet</TwitterLoginButton>
                    <div style={{ padding: 1 }}></div>
                    <AnonymousLoginButton onClick={this.signInAnonymously}>Anonieme login</AnonymousLoginButton>
                </Card>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(Login);
