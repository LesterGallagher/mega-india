import React, { Component } from 'react';
import styles from './RouteDetail.module.css';
import { firebaseReady } from '../../lib/authentication';
import firebase from 'firebase/app';
import * as utils from '../../lib/geo';
import { ListItem, List, ListHeader, ListTitle, Icon, Fab, Page, Card } from 'react-onsenui';
import config from '../../config';
import { format } from 'timeago.js';
import { withRouter } from 'react-router-dom';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import Loading from '../Loading/Loading';
import RouteInfo from '../RouteInfo/RouteInfo';
import NewRouteOrderMapContainer from '../NewRouteOrderMapContainer/NewRouteOrderMapContainer';
import RouteOrderDeliveryOfferOverview from '../RouteOrderDeliveryOfferOverview/RouteOrderDeliveryOfferOverview';

class RouteDetail extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.state = {
        };
    }

    componentDidMount = async () => {
        const doc = await firebase.firestore().collection('routeorders').doc(this.id).get();
        const data = doc.data();
        data.id = doc.id;
        this.setState({
            routeOrder: data
        });
        const origin = data.start_location;
        const destination = data.end_location;
        const directionsService = new window.google.maps.DirectionsService;
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status == window.google.maps.DirectionsStatus.OK) {
                console.log(result);
                this.setState({ directions: result });
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    componentWillUnmount() {
    }

    render() {
        if (!this.state.routeOrder) return <Loading />
        const routeOrder = this.state.routeOrder;
        return (
            <Page renderToolbar={() => <ToolbarNormal name={routeOrder.title} />}>
                <h3>Route</h3>
                <Card>
                    <p className={styles.fromTo}>Van {routeOrder.start_address} naar {routeOrder.end_address}</p>
                    <p className={styles.summary}>{routeOrder.summary}</p>
                    <p className={styles.description}>{routeOrder.description}</p>
                    <p className={styles.senderName}>{routeOrder.senderName}</p>
                    <p className={styles.timestamp}>{format(routeOrder.timestamp, navigator.language || 'nl')}</p>
                </Card>
                <Card>
                    <NewRouteOrderMapContainer
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        directions={this.state.directions} />
                </Card>
                <Card>
                    <RouteInfo directions={this.state.directions} />
                </Card>
                <Card>
                    <RouteOrderDeliveryOfferOverview routeOrder={routeOrder} />
                </Card>
            </Page>
        );
    }
}

export default RouteDetail;
