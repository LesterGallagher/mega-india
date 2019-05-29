
import React, { Component } from 'react';
import styles from './RouteDetail.module.css';
import firebase from '../../lib/firebase';
import { Page, Card } from 'react-onsenui';
import { format } from 'timeago.js';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import Loading from '../Loading/Loading';
import RouteInfo from '../RouteInfo/RouteInfo';
import NewRouteOrderMapContainer from '../NewRouteOrderMapContainer/NewRouteOrderMapContainer';
import RouteOrderDeliveryOfferOverview from '../RouteOrderDeliveryOfferOverview/RouteOrderDeliveryOfferOverview';
import AcceptedDeliveryOffer from '../AcceptedDeliveryOffer/AcceptedDeliveryOffer';
import UserBadge from '../UserBadge/UserBadge';

class RouteDetail extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.state = {
            acceptanceDialog: false
        };
    }

    componentDidMount = async () => {
        this.unsubscribe = firebase.firestore()
            .collection('routeorders')
            .doc(this.id)
            .onSnapshot(this.onSnapshot);
    }

    onSnapshot = doc => {
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
        this.unsubscribe();
    }

    render() {
        if (!this.state.routeOrder) return <Loading />
        const routeOrder = this.state.routeOrder;
        return (
            <Page renderToolbar={() => <ToolbarNormal name={routeOrder.title} />}>
                <h2 style={{ margin: 10 }}>Route</h2>
                <Card>
                    <p className={styles.fromTo}>Van {routeOrder.start_address} naar {routeOrder.end_address}</p>
                    <p className={styles.summary}>{routeOrder.summary}</p>
                    <p className={styles.description}>{routeOrder.description}</p>
                    {/* <p className={styles.senderName}>{routeOrder.senderName}</p> */}
                    <UserBadge uid={routeOrder.senderUid} />
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
                {routeOrder.acceptedRouteOrderOfferId
                    ? <AcceptedDeliveryOffer routeOrder={routeOrder} />
                    : <Card>
                        <RouteOrderDeliveryOfferOverview routeOrder={routeOrder} />
                    </Card>}
            </Page>
        );
    }
}

export default RouteDetail;
