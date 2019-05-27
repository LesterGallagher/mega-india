import React, { Component } from 'react';
import styles from './LoginWithEmail.module.css';
import { Card, Input, Button, Switch } from 'react-onsenui';
import image from './image.png';
import MyEmailLoginButton from '../../../EmailLoginButton/EmailLoginButton';
import AuthStore from '../../../../stores/AuthStore';
import Loading from '../../../Loading/Loading';

class LoginWithEmail extends Component {
    constructor(props) {
        super();
        this.state = {
            register: true,
        };
        this.randSwitchId = Math.random().toString(36);
        this.randEmailId = Math.random().toString(36);
        this.randPasswordId = Math.random().toString(36);
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    handleSwitch = e => {
        this.setState({
            register: e.target.checked
        });
    }

    handleRegister = async () => {
        this.setState({ loading: true });
        const email = document.getElementById(this.randEmailId).value;
        const password = document.getElementById(this.randPasswordId).value;
        await AuthStore.registerWithEmailPassword(email, password);
        this.setState({ loading: false });
    }

    handleLogin = async () => {
        this.setState({ loading: true });
        const email = document.getElementById(this.randEmailId).value;
        const password = document.getElementById(this.randPasswordId).value;
        await  AuthStore.loginWithEmailPassword(email, password);
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) return <Loading />
        return (
            <div className={styles.root}>
                <div className={styles.alignCenter}>
                    <div className={styles.loginButton}>
                        <img className={styles.img} src={image} alt="Login" />
                    </div>
                    <Card className={styles.card}>
                        <h3 className={styles.title}>{this.state.register ? 'Registeren' : 'Inloggen'}</h3>
                        <p>&nbsp;</p>
                        <Input
                            inputId={this.randEmailId}
                            title="Email"
                            placeholder="Email"
                            float
                            type="email"
                            min="2"
                            max="512"
                            name="email" /><br />
                        <br />
                        <Input
                            inputId={this.randPasswordId}
                            title="Wachtwoord"
                            placeholder="Wachtwoord"
                            float
                            type="password"
                            min="8"
                            max="30"
                            name="password" /><br />
                        <br />
                        <label htmlFor={this.randSwitchId}>Registreren?</label><br />
                        <Switch inputId={this.randSwitchId} onChange={this.handleSwitch} checked={this.state.register} />
                        <br />
                        <br />
                        <MyEmailLoginButton
                            onClick={this.state.register ? this.handleRegister : this.handleLogin}
                            style={{ margin: 0 }}>
                            {this.state.register ? 'Registeren' : 'Inloggen'}
                        </MyEmailLoginButton><br />
                        <Button modifier="large" onClick={this.props.onBack}>Terug</Button>
                    </Card>
                </div>
            </div>
        );
    }
}

export default LoginWithEmail;
