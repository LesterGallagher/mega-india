import { firebaseReady } from "./authentication";
import AuthStore from "../stores/AuthStore";
import { getDisplayName } from "./user";

const getLatAndLngFromGMapsFuncs = obj => {
    return {
        lat: obj.lat(),
        lng: obj.lng()
    }
}

export class RouteOrder {
    constructor(mapsResult, cost) {
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
        this.description = 'Test description';
        this.title = 'Test title';
    }
}

export const placeRouteOrder = async (routeOrder) => {
    const firebase = await firebaseReady;
    console.log(routeOrder);
    firebase.firestore().collection("routeorders").add(Object.assign({}, routeOrder));
}

