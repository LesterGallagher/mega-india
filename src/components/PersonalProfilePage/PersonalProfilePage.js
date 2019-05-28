import React, { Component } from 'react';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar } from 'react-onsenui';
import styles from './PersonalProfilePage.module.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import UserProfile from '../UserProfile/UserProfile';
import AuthStore from '../../stores/AuthStore';



const renderToolbar = () => {
    return (<Toolbar>
        <div className="left">
            <ToolbarButton onClick={window.toggleOnsMenu}>
                <Icon icon="md-menu" />
            </ToolbarButton>
        </div>
        <div className="center">
            Mijn Profiel
            </div>
        <div className="right">
        </div>
    </Toolbar>);
}

export default () => {
    return (
        <ProfilePage uid={AuthStore.user.uid} />
    );
}

