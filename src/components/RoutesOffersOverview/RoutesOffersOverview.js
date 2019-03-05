import React, { Component } from 'react';
import styles from './RoutesOffersOverview.module.css';
import { firebaseReady } from '../../lib/authentication';
import firebase from 'firebase/app';
import * as utils from '../../lib/geo';
import { ListItem, List, ListHeader, Page, Toolbar, Card } from 'react-onsenui';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import RoutesList from '../RoutesList/RoutesList';

class RoutesOffersOverview extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    /**
    * Get locations within a bounding box defined by a center point and distance from from the center point to the side of the box;
    *
    * @param {Object} area an object that represents the bounding box
    *    around a point in which locations should be retrieved
    * @param {Object} area.center an object containing the latitude and
    *    longitude of the center point of the bounding box
    * @param {number} area.center.latitude the latitude of the center point
    * @param {number} area.center.longitude the longitude of the center point
    * @param {number} area.radius (in kilometers) the radius of a circle
    *    that is inscribed in the bounding box;
    *    This could also be described as half of the bounding box's side length.
    * @return {Promise} a Promise that fulfills with an array of all the
    *    retrieved locations
    */
    getRouteOrdersInArea = async (area) => {
        // calculate the SW and NE corners of the bounding box to query for
        const box = utils.boundingBoxCoordinates(area.center, area.radius);

        // construct the GeoPoints
        const lesserGeopoint = new firebase.firestore.GeoPoint(box.swCorner.latitude, box.swCorner.longitude);
        const greaterGeopoint = new firebase.firestore.GeoPoint(box.neCorner.latitude, box.neCorner.longitude);

        // construct the Firestore query
        let query = firebase.firestore().collection('routeorders')
            .where('start_location', '>', lesserGeopoint)
            .where('start_location', '<', greaterGeopoint)
            .orderBy("timestamp");

        // return a Promise that fulfills with the locations
        try {
            const snapshot = await query.get();
            const allLocs = []; // used to hold all the loc data
            snapshot.forEach((loc) => {
                // get the data
                const data = loc.data();
                // calculate a distance from the center
                data.distanceFromCenter = utils.distance(area.center, data.location);
                // add to the array
                allLocs.push(data);
            });
            return allLocs;
        } catch (err) {
            console.error(err);
            return new Error('Error while retrieving events');
        };
    }

    componentWillMount = async () => {
        const routesList = await this.getRouteOrders();
        this.setState({
            routesList: routesList
        });
    }

    getRouteOrders = async () => {
        let query = firebase.firestore().collection('routeorders')
            .orderBy("timestamp");

        try {
            const snapshot = await query.get();
            const allLocs = []; // used to hold all the loc data
            snapshot.forEach((loc) => {
                const data = loc.data();
                data.id = loc.id;
                allLocs.push(data);
            });
            return allLocs;
        } catch (err) {
            console.error(err);
            return new Error('Error while retrieving events');
        };
    }


    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        console.log(this.state.routesList);
        return (
            <Page className="RoutesOffersOverview" renderToolbar={() => <ToolbarNormal name="Route lijst" />}>
                <h2 style={{ margin: 10 }}>Laatste routes</h2>
                <Card style={{ padding: 0}}>
                    <List>
                        <RoutesList routesList={this.state.routesList || []} />
                    </List>
                </Card>
            </Page>
        );
    }
}

export default RoutesOffersOverview;
