import { GoogleMap, Marker, withGoogleMap, DirectionsRenderer } from "react-google-maps"
import React, { Component } from 'react';
import config from '../../config';

export class NewRouteOrderMapContainer extends Component {
    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
        this.directionsService = new window.google.maps.DirectionsService()
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render = () => {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
                onClick={this.onMapClicked}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                {this.props.directions && <DirectionsRenderer directions={this.props.directions} />}

                {/* <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow> */}
            </GoogleMap>
        )
    }
}

export default withGoogleMap(NewRouteOrderMapContainer);
