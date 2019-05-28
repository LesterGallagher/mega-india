import React, { Component } from 'react';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar } from 'react-onsenui';
import styles from './AccountPage.module.css';
import AccountEdit from '../AccountEdit/AccountEdit';

class AccountPage extends Component {
    constructor(props) {
        super();
        this.state = {
            progress: {}
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    renderToolbar = () => {
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">
                Mijn Account
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    handleLoadingProgress = progress => {
        this.setState({ progress });
    }

    render() {
        const { progress } = this.state;
        return (
            <Page renderToolbar={this.renderToolbar}>
                <ProgressBar {...progress} />
                <div className={styles.AccountPage}>
                    <AccountEdit onLoadingProgress={this.handleLoadingProgress} />
                </div>
            </Page>
        );
    }
}

export default AccountPage;
