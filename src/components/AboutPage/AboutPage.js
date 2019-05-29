import React, { Component } from 'react';
import styles from './AboutPage.module.css';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar } from 'react-onsenui';

class AboutPage extends Component {
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
                Over
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className={styles.AboutPage}>
                    
                </div>
            </Page>
        );
    }
}

export default AboutPage;
