import AuthStore from "../stores/AuthStore";
import { getDisplayName } from "../lib/user";
import firebase from '../lib/firebase';

const getLatAndLngFromGMapsFuncs = obj => {
    return {
        lat: obj.lat(),
        lng: obj.lng()
    }
}

export class RouteOrder {
    constructor(mapsResult, cost, title, description, receiverUid = null, state = RouteOrder.STATES.INITIAL, acceptedRouteOrderOfferId = null, transportMethods = [], dateTime = new Date()) {
        const route = mapsResult.routes[0];
        const { summary, legs, overview_polyline } = route;
        const { distance, duration,
            end_address, end_location,
            start_address, start_location } = legs[0];
        this.overview_polyline = overview_polyline;
        this.distance = distance.value;
        this.summary = summary;
        this.duration = duration.value;
        this.end_address = end_address;
        this.end_location = getLatAndLngFromGMapsFuncs(end_location);
        this.start_address = start_address;
        this.start_location = getLatAndLngFromGMapsFuncs(start_location);
        this.cost = cost;
        this.senderUid = AuthStore.user.uid;
        this.timestamp = new Date().getTime();
        this.senderName = getDisplayName(AuthStore.user);
        this.description = title;
        this.title = description;
        this.receiverUid = receiverUid;
        this.state = state;
        this.acceptedRouteOrderOfferId = acceptedRouteOrderOfferId;
        this.transportMethods = transportMethods;
        this.dateTime = dateTime.getTime();
    }

    static STATES = {
        INITIAL: 'INITIAL',
        PICKED_UP: 'PICKED_UP',
        DONE: 'DONE',
        COMPLETE: 'COMPLETE'
    }
}

export const placeRouteOrder = async (routeOrder) => {
    await firebase.ready;
    const ref = await firebase.firestore().collection("routeorders").add(Object.assign({}, routeOrder));
    return await ref.get();
}

