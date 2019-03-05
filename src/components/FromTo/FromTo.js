import React, { Component } from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon, Row, Col, Input } from 'react-onsenui';
import { Link } from 'react-router-dom';
import styles from './FromTo.module.css';
import MapsAutocompleteSearchbar from '../MapsAutocompleteSearchbar/MapsAutocompleteSearchbar';


class FromTo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: ''
        }
    }

    handleChange = name => value => {
        this.setState({ [name]: value }, this.firePropsChangeEvent);
    }

    firePropsChangeEvent = () => {
        if (this.props.onChange) {
            this.props.onChange({
                origin: this.state.origin,
                destination: this.state.destination
            });
        }
    }

    render() {
        return (<div className={styles.fromTo}>
            <Row verticalAlign="center">
                <Col>
                    <div>
                        <Icon icon='fa-map-marker' /> 
                        <MapsAutocompleteSearchbar className={styles.searchBar} type="text" placeholder="vanaf" onChange={this.handleChange('origin')} />
                    </div>
                </Col>
                <Col className={styles.truckIcon}>
                    <div>
                        <Icon icon='fa-truck' />
                    </div>
                </Col>
                <Col>
                    <div>
                        <Icon icon='fa-map-marker' /> 
                        <MapsAutocompleteSearchbar className={styles.searchBar} type="text" placeholder="naar" onChange={this.handleChange('destination')} />
                    </div>
                </Col>
            </Row>
        </div>);
    }
}

export default FromTo;