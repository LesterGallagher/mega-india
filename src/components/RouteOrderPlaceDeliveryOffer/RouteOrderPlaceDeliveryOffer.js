import React, { Component } from 'react';
import styles from './RouteOrderPlaceDeliveryOffer.module.css';
import { Input, Button } from 'react-onsenui';
import { placeRouteOrderOffer } from '../../services/route-order-offers';

class RouteOrderPlaceDeliveryOffer extends Component {
    constructor(props) {
        super();
        this.state = {
            text: ''
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    handlePlaceOrder = () => {
        const amount = parseInt(this.state.text);
        if (isFinite(amount) === false) alert(this.state.text + ' is an invalid number.');
        placeRouteOrderOffer(amount, this.props.routeOrder);
    }

    render() {
        if (!this.props.routeOrder) return;
        return (
            <div className="RouteOrderPlaceDeliveryOffer">
                <Input
                    style={{ width: 200 }}
                    value={this.state.text}
                    float
                    type="number"
                    min="0"
                    max="200"
                    onChange={(event) => { this.setState({ text: event.target.value }) }}
                    placeholder='Prijs in €' />
                <Button onClick={this.handlePlaceOrder}>Plaats Bod</Button>
            </div>
        );
    }
}

export default RouteOrderPlaceDeliveryOffer;
