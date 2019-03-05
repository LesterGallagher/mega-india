import React, { Component } from 'react';
import styles from './RouteInfo.component.css';
import { calculateRouteCostsInEuro, routeCostsColor } from '../../lib/RouteCosts'

class RouteInfo extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        if (!this.props.directions) return null;
        const { distance, duration } = this.props.directions.routes[0].legs[0];
        const summary = this.props.directions.routes[0].summary;
        const cost = this.state.cost
            || this.props.cost 
            || calculateRouteCostsInEuro(duration.value, distance.value);
        const color = routeCostsColor(cost);
        return (
            <div className="RouteInfo">
                <h2>{summary}</h2>
                <h4>Afstand: {distance.text}</h4>
                <h4>Duur: {duration.text}</h4>
                <h3 style={{ backgroundColor: color }}>€ {cost}</h3>
            </div>
        );
    }
}

export default RouteInfo;
