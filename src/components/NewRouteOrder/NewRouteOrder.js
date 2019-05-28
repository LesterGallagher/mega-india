import React, { Component } from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon, Card } from 'react-onsenui';
import { Link } from 'react-router-dom';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import FromTo from '../FromTo/FromTo';
import NewRouteOrderMapContainer from '../NewRouteOrderMapContainer/NewRouteOrderMapContainer';
import styles from './NewRouteOrder.module.css';
import config from '../../config';
import Script from 'react-load-script';
import RouteInfo from '../RouteInfo/RouteInfo';
import { RouteOrder, placeRouteOrder } from '../../services/route-order';
import { calculateRouteCostsInEuro, routeCostsColor } from '../../lib/route-costs';
import AuthStore from '../../stores/AuthStore';
import firebase from '../../lib/firebase';

class NewRouteOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromTo: {
                origin: 'Oosterhoutsestraat, Nederland',
                destination: 'Bredaseweg, Breda, Nederland'
            }
        }
    }

    handleShowRoute = async () => {
        const { destination, origin } = this.state.fromTo;
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

    handleFromToChange = fromTo => {
        this.setState({
            fromTo: fromTo
        }, () => console.log(this.state.fromTo));
    }

    handlePlaceRouteOrder = async () => {
        const { distance, duration } = this.state.directions.routes[0].legs[0];
        const cost = calculateRouteCostsInEuro(duration.value, distance.value);

        const routeOrder = new RouteOrder(this.state.directions, cost);
        await firebase.ready;
        if (AuthStore.isAuthenticated === false) {
            alert('Sorry you are not logged in');
            return;
        }
        placeRouteOrder(routeOrder);
    }

    render() {
        const directionsInfoClassname = [
            this.state.directions ? styles.directionsOpen : styles.directionsClosed,
            styles.directionsInfo
        ];

        return (<Page renderToolbar={() => <ToolbarNormal title="Home" />}>
            <h1 style={{ margin: 10 }}>Nieuwe Route</h1>
            <Card>
                <FromTo onChange={this.handleFromToChange} />
                <Button onClick={this.handleShowRoute}>Bekijk route...</Button>
            </Card>
            <Card>
                <div>
                    <NewRouteOrderMapContainer
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        directions={this.state.directions} />
                </div>
            </Card>
            <div className={directionsInfoClassname.join(' ')}>
                <Card>
                    <RouteInfo directions={this.state.directions} />

                    <Button onClick={this.handlePlaceRouteOrder}>Plaats Route</Button>
                </Card>
            </div>
        </Page>);
    }
}

export default NewRouteOrder;