import React, { Component } from 'react';
import styles from './SettingsPage.module.css';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar, List, ListTitle, ListItem } from 'react-onsenui';

class SettingsPage extends Component {
    constructor(props) {
        super();
        this.state = {
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
                Instellingen
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <List>
                    <ListTitle>Instellingen</ListTitle>
                    <ListItem>

                    </ListItem>
                </List>
            </Page>
        );
    }
}

export default SettingsPage;

