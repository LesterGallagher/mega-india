import React, { Component } from 'react';
import './RouteOrderDeliveryOfferOverview.css';
import RouteOrderDeliveryOffers from '../RouteOrderDeliveryOffers/RouteOrderDeliveryOffers';
import RouteOrderPlaceDeliveryOffer from '../RouteOrderPlaceDeliveryOffer/RouteOrderPlaceDeliveryOffer';
import AuthStore from '../../stores/AuthStore';
import { Page, Icon } from 'react-onsenui';

class RouteOrderDeliveryOfferOverview extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {

    }

    renderYouveMadeThisOffer = () => {
        return (
            <div>
                <h2>
                    <Icon style={{ backgroundColor: '#0c0', padding: 5, color: '#fff' }}
                        icon="fa-check" /> Jij hebt deze route geplaatst.</h2>
            </div>
        )
    }

    render() {
        const routeOrder = this.props.routeOrder;
        console.log(routeOrder, AuthStore.user);
        return (
            <div className="RouteOrderDeliveryOfferOverview">
                <RouteOrderDeliveryOffers routeOrder={routeOrder} />
                <div style={{ padding: 10 }}></div>
                {routeOrder.senderUid === AuthStore.user.uid
                    ? this.renderYouveMadeThisOffer()
                    : <RouteOrderPlaceDeliveryOffer routeOrder={routeOrder} />}
            </div>
        );
    }
}

export default RouteOrderDeliveryOfferOverview;
