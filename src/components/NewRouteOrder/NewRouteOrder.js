import React, { Component } from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon, Card, List, Col, Row, Fab, ListItem, Checkbox, Input } from 'react-onsenui';
import { Link } from 'react-router-dom';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import FromTo from '../FromTo/FromTo';
import NewRouteOrderMapContainer from '../NewRouteOrderMapContainer/NewRouteOrderMapContainer';
import styles from './NewRouteOrder.module.css';
import config from '../../config';
import Script from 'react-load-script';
import RouteInfo from '../RouteInfo/RouteInfo';
import { RouteOrder, placeRouteOrder } from '../../services/route-order';
import { calculateRouteCostsInEuro, routeCostsColor } from '../../lib/route-costs';
import AuthStore from '../../stores/AuthStore';
import firebase from '../../lib/firebase';
import { withRouter } from 'react-router-dom';
import * as ons from 'onsenui';
import { ROUTE_DETAIL } from '../../constants/routes';
import ChoosePackageReceiver from '../ChoosePackageReceiver/ChoosePackageReceiver';
import UserBadge from '../UserBadge/UserBadge';
import UserPublicDataProvider, { withUserPublicData } from '../UserPublicDataProvider/UserPublicDataProvider';
import colors from '../../style/colors.css';
import classNames from 'classnames';
import ImportantInput from '../ImportantInput/ImportantInput';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import NewRouteOrderStore from '../../stores/NewRouteOrderStore';

const UserBadgeWithPublicData = withUserPublicData(UserBadge);

class NewRouteOrder extends Component {
    constructor(props) {
        super(props);

        this.state = NewRouteOrderStore.state;
    }

    handleNewRouteOrderStoreChange = () => {
        this.setState(NewRouteOrderStore.state);
    }

    componentDidMount = () => {
        NewRouteOrderStore.on('change', this.handleNewRouteOrderStoreChange);
    }

    componentWillUnmount = () => {
        NewRouteOrderStore.removeListener('change', this.handleNewRouteOrderStoreChange);
    }

    handleShowRoute = async () => {
        const { destination, origin } = this.state.fromTo;
        const directionsService = new window.google.maps.DirectionsService;
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status == window.google.maps.DirectionsStatus.OK) {
                const { routes } = result;
                const route = routes[0];
                const leg = route.legs[0];
                const { distance, duration } = leg
                const cost = calculateRouteCostsInEuro(duration.value, distance.value);
                this.setStoreState({ directions: result, cost });
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    handleFromToChange = fromTo => {
        this.setStoreState({
            fromTo: fromTo
        });
    }

    setStoreState = state => {
        NewRouteOrderStore.setStoreState(state);
    }

    handlePlaceRouteOrder = async () => {
        try {
            const { distance, duration } = this.state.directions.routes[0].legs[0];
            const { cost, receiver, title, description, date } = this.state;

            const dateTime = new Date(date.valueOf());
            dateTime.setHours(this.state.time.hours);
            dateTime.setMinutes(this.state.time.minutes);


            const routeOrder = new RouteOrder(this.state.directions, cost, title, description, receiver, undefined, undefined, this.getTransportMethods(), dateTime);
            await firebase.ready;
            if (AuthStore.isAuthenticated === false) {
                alert('Sorry you are not logged in');
                return;
            }
            const doc = await placeRouteOrder(routeOrder);
            this.props.history.push(ROUTE_DETAIL.replace(':id', doc.id));
        } catch (err) {
            ons.notification.alert('Kan route niet plaatsen. Foutmelding: ' + err);
        }
    }

    getTransportMethods = () => {
        const { transportMethods } = this.state;
        const { otherText, fiets, brommer, auto, vrachtbus, anders } = transportMethods;

        const keys = Object.keys({ fiets, brommer, auto, vrachtbus })
            .filter(key => transportMethods[key])

        if (anders) {
            keys.push(...otherText.split(/\s*,\s*/));
        }

        return keys;
    }

    handleTransportMethods = key => e => {
        this.setStoreState(prevState => {
            prevState.transportMethods[key] = e.target.checked;
            return prevState;
        });
    }

    handleTransportMethodsOther = e => {
        this.setStoreState(prevState => {
            prevState.transportMethods.otherText = e.target.value;
            return prevState;
        });
    }

    changeTime = obj => {
        if (obj.timeHours) {
            if (+(obj.timeHours) > 60) obj.timeHours = 60;
            if (+(obj.timeHours < 0)) obj.timeHours = 0;
            if (obj.timeHours.length > 2) obj.timeHours = this.state.timeHours;
        } else if (obj.timeMinutes) {
            if (+(obj.timeMinutes) > 60) obj.timeMinutes = 60;
            if (+(obj.timeMinutes < 0)) obj.timeMinutes = 0;
            if (obj.timeMinutes.length > 2) obj.timeMinutes = this.state.timeMinutes;
        }
        this.setStoreState(obj);
    }

    render() {
        const { receiver, directions, fromTo } = this.state;

        const directionsInfoClassname = [
            directions ? styles.directionsOpen : styles.directionsClosed,
            styles.directionsInfo
        ];

        return (<Page renderToolbar={() => <ToolbarNormal title="Home" />}>
            <h5 style={{ margin: 10 }}>Nieuwe Route</h5>
            <Card>
                <div className="text-center">
                    <h2>Wat wilt u vervoeren?</h2>
                    <p>Voer een titel in</p>
                    <div>
                        <ImportantInput></ImportantInput>&nbsp;
                        <Button style={{ height: 49, maxHeight: 200, lineHeight: '51px', verticalAlign: 'top' }}>Vind rubriek</Button>
                    </div>
                    <br />
                    <h4>Omschrijving</h4>
                    <textarea style={{ width: '100%' }}
                        onChange={e => this.setStoreState({ description: e.target.value })}
                        value={this.state.description}
                        className="textarea textarea--transparent"
                        rows="6"
                        placeholder="Omschrijf het soort transport en de lading die je wil laten vervoeren."></textarea>
                </div>
            </Card>
            <h5 className="m10">Vervoelsmiddel</h5>
            <Card>
                <List>
                    <ListItem>
                        <label className="left">
                            <Checkbox
                                checked={this.state.transportMethods.fiets}
                                inputId="vervoersmiddel_fiets"
                                onChange={this.handleTransportMethods('fiets')}
                                modifier='material' />
                        </label>
                        <label htmlFor="vervoersmiddel_fiets" className="center">
                            Fiets
                        </label>
                    </ListItem>
                    <ListItem>
                        <label className="left">
                            <Checkbox
                                checked={this.state.transportMethods.brommer}
                                onChange={this.handleTransportMethods('brommer')}
                                inputId="vervoersmiddel_brommer"
                                modifier='material' />
                        </label>
                        <label htmlFor="vervoersmiddel_brommer" className="center">
                            Brommer
                        </label>
                    </ListItem>
                    <ListItem>
                        <label className="left">
                            <Checkbox
                                checked={this.state.transportMethods.auto}
                                onChange={this.handleTransportMethods('auto')}
                                inputId="vervoersmiddel_auto"
                                modifier='material' />
                        </label>
                        <label htmlFor="vervoersmiddel_auto" className="center">
                            Auto
                        </label>
                    </ListItem>
                    <ListItem>
                        <label className="left">
                            <Checkbox
                                checked={this.state.transportMethods.vrachtbus}
                                onChange={this.handleTransportMethods('vrachtbus')}
                                inputId="vervoersmiddel_vrachtbus"
                                modifier='material' />
                        </label>
                        <label htmlFor="vervoersmiddel_vrachtbus" className="center">
                            Vrachtbus
                        </label>
                    </ListItem>
                    <ListItem>
                        <label className="left">
                            <Checkbox
                                checked={this.state.transportMethods.anders}
                                onChange={this.handleTransportMethods('anders')}
                                inputId="vervoersmiddel_anders"
                                modifier='material' />
                        </label>
                        <div className="center">
                            <label htmlFor="vervoersmiddel_anders" className="list-item__title">
                                Anders
                            </label>
                            <span className="list-item__subtitle">
                                <Input
                                    type="text"
                                    style={{ width: 370 }}
                                    onChange={this.handleTransportMethodsOther}
                                    placeholder="Bijvoorbeeld: Vrachtwagen, ruimteschip. etc" />
                            </span>
                        </div>
                    </ListItem>
                </List>

            </Card>
            <h5 className="m10">Wanneer</h5>
            <Card>
                <Row>
                    <Col>
                        <h6>Datum</h6>
                        <SingleDatePicker
                            date={this.state.date} // momentPropTypes.momentObj or null
                            numberOfMonths={1}
                            onDateChange={date => this.setStoreState({ date })} // PropTypes.func.isRequired
                            focused={this.state.focused} // PropTypes.bool
                            onFocusChange={({ focused }) => this.setStoreState({ focused })} // PropTypes.func.isRequired
                            id="your_unique_id" // PropTypes.string.isRequired,
                        />

                    </Col>
                    <Col>
                        <h6>Tijd</h6>
                        <Input value={this.state.timeHours}
                            onChange={e => this.changeTime({ timeHours: e.target.value })}
                            type="number"
                            step="1"
                            min="0"
                            max="60"
                            style={{ width: 50 }} />:
                        <Input value={this.state.timeMinutes}
                            onChange={e => this.changeTime({ timeMinutes: e.target.value })}
                            type="number"
                            step="1"
                            min="0"
                            max="60"
                            style={{ width: 50 }} />
                    </Col>
                </Row>

            </Card>
            <h5 className="m10">Route</h5>
            <Card>
                <FromTo onChange={this.handleFromToChange} />
                <Button
                    disabled={!fromTo.origin || !fromTo.destination}
                    onClick={this.handleShowRoute}>Maak route...</Button>
            </Card>
            <h5 className="m10">Kaart</h5>
            <Card>
                <div>
                    <NewRouteOrderMapContainer
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        directions={directions} />
                </div>
            </Card>
            <div className={directionsInfoClassname.join(' ')}>
                <Card>
                    <RouteInfo onCostChange={cost => this.setStoreState({ cost })} cost={this.state.cost} directions={this.state.directions} />

                    <Button
                        onClick={this.handlePlaceRouteOrder}>Plaats Route</Button>
                </Card>
                {receiver
                    ? <ChoosenReceiver uid={receiver} onCloseClick={async () => { await ons.notification.confirm('Weet je het zeker?') && this.setStoreState({ receiver: null }) }} />
                    : <ChoosePackageReceiver onSelect={({ uid, userPublicData }) => this.setStoreState({ receiver: uid })} />}
            </div>
        </Page>);
    }
}

const ChoosenReceiver = ({ uid, onCloseClick }) => {
    return (
        <div>
            <h5 className={styles.m10}>Geselecteerde ontvanger</h5>
            <Card>
                <List>
                    <ListItem className={styles.p0}>
                        <div className={classNames('center', styles.p0)}>
                            <UserPublicDataProvider uid={uid}>
                                <UserBadgeWithPublicData />
                            </UserPublicDataProvider>
                        </div>
                        <div className={classNames('right', styles.p0)}>
                            <Fab modifier="mini" style={{ backgroundColor: 'red' }} onClick={onCloseClick}>
                                <Icon icon="md-close" style={{ color: '#fff' }} />
                            </Fab>
                        </div>
                    </ListItem>
                </List>
            </Card>
        </div>);
}

export default withRouter(NewRouteOrder);