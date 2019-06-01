import React, { Component } from 'react';
import styles from './RoutesList.module.css';
import firebase from '../../lib/firebase';
import * as utils from '../../lib/geo';
import { ListItem, List, ListHeader, ListTitle, Icon, Fab } from 'react-onsenui';
import config from '../../config';
import { format } from 'timeago.js';
import { withRouter } from 'react-router-dom';
import RouteBadge from '../RouteBadge/RouteBadge';

class RoutesList extends Component {
    constructor(props) {
        super();
        this.state = {

        };
    }

    renderItem = (routeOrder, key) => {
        return (
            <ListItem tappable key={key} className={styles.listItem}>
                <RouteBadge routeOrder={routeOrder} />
            </ListItem>
        )
    }

    render() {
        return (
            <div className="RoutesList">
                {(this.props.routesList || []).length === 0
                    ? <h5>Nothing here...</h5>
                    : (this.props.routesList || []).map(this.renderItem)}
            </div>
        );
    }
}

export default withRouter(RoutesList);
