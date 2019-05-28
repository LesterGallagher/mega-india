import React, { Component } from 'react';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar } from 'react-onsenui';
import styles from './ProfilePage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import AuthStore from '../../stores/AuthStore';
import get from 'lodash/get';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderToolbar = () => {
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">
                {'Profiel'}
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        return (
            <div className={styles.ProfilePage}>
                <Page renderToolbar={this.renderToolbar}>
                    <UserProfile uid={get(this, 'props.match.params.uid', this.props.uid)} />
                </Page>
            </div>
        );
    }
}

export default ProfilePage;
