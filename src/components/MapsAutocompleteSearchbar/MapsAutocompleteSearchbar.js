import React, { Component } from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon, Input } from 'react-onsenui';
import { Link } from 'react-router-dom';
import config from '../../config';

class MapsAutocompleteSearchbar extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        // Declare State
        this.state = {
            query: '',
            randomId: Math.random().toString(36)
        };
    }

    componentDidMount = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Declare Options For Autocomplete
        var options = {
            types: ['address'],
        };

        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(this.state.randomId),
            options,
        );

        // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }

    handlePlaceSelect = () => {

        // Extract City From Address Object
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;

        // Check if address is valid
        if (address) {
            // Set State
            this.setState(
                {
                    city: address[0].long_name,
                    query: addressObject.formatted_address,
                }
                , this.fireOnChangeEvent);
        }
    }

    handleInputChange = e => {
        this.setState({
            query: e.target.value
        }, this.fireOnChangeEvent);
    }

    fireOnChangeEvent = () => {
        if (this.props.onChange) this.props.onChange(this.state.query);
    }

    render = () => {
        return (
            <div className={this.props.className}>
                <Input inputId={this.state.randomId}
                    value={this.state.query}
                    float
                    placeholder={this.props.placeholder}
                    onChange={this.handleInputChange}
                />
            </div>
        );
    }
}

export default MapsAutocompleteSearchbar;