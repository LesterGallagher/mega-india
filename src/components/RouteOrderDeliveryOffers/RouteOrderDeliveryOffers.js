import React, { Component } from 'react';
import './RouteOrderDeliveryOffers.css';
import RouteOrderDeliveryOffersItem from '../RouteOrderDeliveryOffersItem/RouteOrderDeliveryOffersItem';
import firebase from '../../lib/firebase';
import { List, ListItem } from 'react-onsenui';

class RouteOrderDeliveryOffers extends Component {
    constructor(props) {
        super();
        this.state = {
            offers: null
        };
    }

    componentWillMount() {
    }

    componentDidMount = () => {
        if (this.props.routeOrder) this.initWithRouteOrderId();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.routeOrder && !this.routeOrderOffersObserver) {
            this.initWithRouteOrderId();
        }
    }

    initWithRouteOrderId = () => {
        this.unsubscribeRouteOrderOffersObserver = firebase.firestore().collection('routeordersoffers')
            .where('routeOrderId', '==', this.props.routeOrder.objectID)
            .onSnapshot((querySnapshot) => {
                const offers = [];
                querySnapshot.forEach(function (doc) {
                    const data = doc.data();
                    data.objectID = doc.id;
                    offers.push(data);
                });
                this.setState({ offers });
            });
    }

    componentWillUnmount() {
        this.unsubscribeRouteOrderOffersObserver();
    }

    renderOffer = (routeOrderOffer, key) => {
        return (
            <RouteOrderDeliveryOffersItem key={key}
                routeOrder={this.props.routeOrder}
                routeOrderOffer={routeOrderOffer} />
        )
    }

    renderEmpty = () => {
        return (
            <ListItem>
                Geen biedingen
            </ListItem>

        )
    }

    render() {
        return (
            <List className="RouteOrderDeliveryOffers">
                {this.state.offers !== null
                    ? this.state.offers.map(this.renderOffer)
                    : this.renderEmpty()}
            </List>
        );
    }
}

export default RouteOrderDeliveryOffers;
