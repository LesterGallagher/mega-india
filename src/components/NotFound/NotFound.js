import React, { Component } from 'react';
import { Page, Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import Loader from '../../components/Loader/Loader';
import styles from './NotFound.module.css';
import NotFoundImage from './NotFoundImage';
import config from '../../config';

class NotFound extends Component {
    render() {
        return (<Page renderToolbar={this.props.renderToolbar} className={styles.root}>
            <NotFoundImage />
        </Page>);
    }
}

export default NotFound;
