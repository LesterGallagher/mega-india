import React, { Component } from 'react';
import styles from './AppSplitterBanner.module.css';
import AuthStore from '../../stores/AuthStore';
import { getProfileImage, getLoadingIcon } from '../../lib/user';
import { withFirebase } from '../Firebase/context';
import firebase from '../../lib/firebase';
import get from 'lodash/get';

class AppSplitterBanner extends Component {
    constructor(props) {
        super();
        this.state = {
            profileImage: getLoadingIcon(),
            data: null
        };


    }

    componentWillMount() {
        this.setState({
            isAuthenticated: AuthStore.isAuthenticated,
            userHasAuthenticated: AuthStore.userHasAuthenticated
        });
        AuthStore.on('change', this.handleAuthStoreChange);
    }

    componentWillUnmount() {
        AuthStore.removeListener('change', this.handleAuthStoreChange);
    }

    userAuthenticated = async () => {
        this.publicDataRef = firebase.database().ref(`/users/${AuthStore.user.uid}/public`);
        const profileImage = await getProfileImage(AuthStore.user.uid);
        this.setState({ profileImage });
        this.publicDataRef.on('value', this.handlePublicDataValue);
    }

    handlePublicDataValue = snapshot => {
        this.setState({ data: snapshot.val() });
    }

    handleAuthStoreChange = async () => {
        if (AuthStore.isAuthenticated && this.state.isAuthenticated) {
            this.userAuthenticated();
        }
        this.setState({
            isAuthenticated: AuthStore.isAuthenticated,
            userHasAuthenticated: AuthStore.userHasAuthenticated
        });
    }

    render() {
        if (AuthStore.isAuthenticated === false) return;
        return (
            <div className={styles.AppSplitterBanner}>
                <img className={styles.avatar} src={this.state.profileImage} alt="Profile avatar" />
                <div className="text-white" style={{ marginBottom: 0 }}>
                    <b>{get(this.state.data, 'displayName')}</b>
                </div>
            </div>
        );
    }
}

export default withFirebase(AppSplitterBanner);