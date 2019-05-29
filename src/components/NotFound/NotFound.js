import React, { Component } from 'react';
import { Page, Toolbar, ToolbarButton, Icon, BackButton } from 'react-onsenui';
import Loader from '../../components/Loader/Loader';
import styles from './NotFound.module.css';
import NotFoundImage from './NotFoundImage';
import config from '../../config';
import { withRouter } from 'react-router-dom';

class NotFound extends Component {

    renderToolbar = () => {
        return (<Toolbar>
            <div className="left">
                <BackButton onClick={this.props.history.goBack}></BackButton>
            </div>
            <div className="center">
                Niet Gevonden
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        return (<Page renderToolbar={this.renderToolbar} className={styles.root}>
            <NotFoundImage />
        </Page>);
    }
}

export default withRouter(NotFound);
