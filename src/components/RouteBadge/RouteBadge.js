import React, { Component } from 'react';
import { List, ListItem, Row, Col } from 'react-onsenui';
import styles from './RouteBadge.module.css';
import { format } from 'timeago.js';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import classNames from 'classnames';

class RouteBadge extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    handleClick = e => {
        this.props.history.push('/route/' + this.props.routeOrder.objectID);
    }

    render() {
        const { routeOrder } = this.props;
        const url = `https://maps.googleapis.com/maps/api/staticmap?size=200x130
                &path=enc%3A${encodeURIComponent(routeOrder.overview_polyline)}
                &key=${config.googleMapsAPIKey}`.replace(/\s/g, '');
        return (
            <Row onClick={this.handleClick} className={styles.badge}>
                <Col className={classNames('left', styles.imgCol)}>
                    <img className={styles.image} src={url} alt="Route thumbnail" />
                </Col>
                <Col className={'center ' + styles.center}>
                    <div>
                        <h5 className={styles.title}>{routeOrder.title}</h5>
                        <p className={styles.fromTo}>Van {routeOrder.start_address} naar {routeOrder.end_address}</p>
                        <p className={styles.summary}>{routeOrder.summary}</p>
                        <p className={styles.description}>{routeOrder.description}</p>
                        <p className={styles.senderName}>{routeOrder.senderName}</p>
                        <p className={styles.timestamp}>{format(routeOrder.timestamp, navigator.language || 'nl')}</p>
                    </div>
                </Col>
            </Row>
        )

    }
}

export default withRouter(RouteBadge);
