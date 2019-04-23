import React, { Component } from 'react';
import styles from './RoutesList.module.css';
import { firebaseReady } from '../../lib/authentication';
import firebase from 'firebase/app';
import * as utils from '../../lib/geo';
import { ListItem, List, ListHeader, ListTitle, Icon, Fab } from 'react-onsenui';
import config from '../../config';
import { format } from 'timeago.js';
import { withRouter } from 'react-router-dom';

class RoutesList extends Component {
    constructor(props) {
        super();
        this.state = {

        };
    }

    handleClick = routeOrder => e => {
        this.props.history.push('/route/' + routeOrder.id);
    }

    renderItem = (routeOrder, key) => {
        const url = `https://maps.googleapis.com/maps/api/staticmap?size=200x130
            &path=enc%3A${encodeURIComponent(routeOrder.overview_polyline)}
            &key=${config.googleMapsAPIKey}`.replace(/\s/g, '');
        return (
            <ListItem tappable key={key} className={styles.listItem} onClick={this.handleClick(routeOrder)}>
                <div className="left">
                    <img className={styles.image} src={url} alt="Route thumbnail" />
                </div>
                <div className={'center ' + styles.center}>
                    <div>
                        <h3 className={styles.title}>{routeOrder.title}</h3>
                        <p className={styles.fromTo}>Van {routeOrder.start_address} naar {routeOrder.end_address}</p>
                        <p className={styles.summary}>{routeOrder.summary}</p>
                        <p className={styles.description}>{routeOrder.description}</p>
                        <p className={styles.senderName}>{routeOrder.senderName}</p>
                        <p className={styles.timestamp}>{format(routeOrder.timestamp, navigator.language || 'nl')}</p>
                    </div>
                </div>
            </ListItem>
        )
    }

    render() {
        return (
            <div className="RoutesList">
                {(this.props.routesList || []).map(this.renderItem)}
            </div>
        );
    }
}

export default withRouter(RoutesList);
