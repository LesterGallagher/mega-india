import React, { Component } from 'react';
import styles from './RouteInfo.component.css';
import { calculateRouteCostsInEuro, routeCostsColor } from '../../lib/route-costs'
import { List, ListItem, ListTitle, ListHeader, Input,  } from 'react-onsenui';

class RouteInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            cost: null
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { directions, readOnly } = this.props;
        if (!directions) return null;

        const { routes, geocoded_waypoints, request, status } = directions;
        const route = routes[0];
        const leg = route.legs[0];
        const { summary } = route;
        const { distance, duration, end_address, start_address } = leg
        const { origin, destination } = request;
        const cost = this.props.cost;
        const color = routeCostsColor(cost);

        return (
            <div className="RouteInfo">
                <List>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">
                                Van
                            </span>
                            <span className="list-item__subtitle">{start_address}</span>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">
                                Naar
                            </span>
                            <span className="list-item__subtitle">{end_address}</span>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">
                                Via
                            </span>
                            <span className="list-item__subtitle">{summary}</span>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">
                                Afstand
                            </span>
                            <span className="list-item__subtitle">{distance.text}</span>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">
                                Duur
                            </span>
                            <span className="list-item__subtitle">{duration.text}</span>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">
                                Vergoeding
                            </span>
                            <span style={{ backgroundColor: color }} className="list-item__subtitle">
                                <Input readonly={readOnly} readOnly={readOnly} type="number" step="1" min="0" max="5000" value={'' + cost} onChange={e => this.props.onCostChange(+e.target.value)}  />
                            </span>
                        </div>
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default RouteInfo;
