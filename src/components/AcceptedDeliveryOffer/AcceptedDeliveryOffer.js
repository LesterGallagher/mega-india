import React, { Component } from 'react';
import './AcceptedDeliveryOffer.css';
import UserCard from '../UserCard/UserCard';
import firebase from 'firebase/app';
import AuthStore from '../../stores/AuthStore';
import { Button } from 'react-onsenui';
import * as ons from 'onsenui';

class AcceptedDeliveryOffer extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentDidMount() {
        const { routeOrder } = this.props;
        const { acceptedRouteOrderOfferId } = routeOrder;
        this.unsubscribe = firebase.firestore()
            .collection('routeordersoffers')
            .doc(acceptedRouteOrderOfferId)
            .onSnapshot(this.onSnapshot);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onSnapshot = snapshot => {
        const routeOrderOffer = snapshot.data();
        routeOrderOffer.id = snapshot.id;
        this.setState({
            routeOrderOffer: routeOrderOffer
        })
    }

    handleAfgerond = async () => {
        const result = await ons.notification.confirm('Weet je zeker dat je de bezorging afgerond hebt? Je kunt deze actie niet herstellen.', {
            buttonLabels: ['Annuleer', 'OK']
        });
        if (!result) return;

        const routeOrderOffer = this.state.routeOrderOffer;
        console.log(routeOrderOffer);

        await firebase.firestore()
            .collection('routeordersoffers')
            .doc(routeOrderOffer.id)
            .update({
                done: true
            });
    }

    handlePickedUp = async () => {
        const result = await ons.notification.confirm('Weet je zeker dat dit correct is? Je kunt deze actie niet herstellen.', {
            buttonLabels: ['Annuleer', 'OK']
        });
        if (!result) return;

        const routeOrderOffer = this.state.routeOrderOffer;
        console.log(routeOrderOffer);

        await firebase.firestore()
            .collection('routeordersoffers')
            .doc(routeOrderOffer.id)
            .update({
                pickedUp: true
            });
    }

    agreeWithDelivery = async () => {
        const result = await ons.notification.confirm(
            'Weet je zeker dat de bezorger alles goed heeft afgerond. '
            + 'Heb je contact opgenomen met de ontvanger en de afgever? '
            + 'Als je niet met de app hebt betaald, zorg er dan voor dat '
            + 'de bezorger betaald is, en dat de borg teruggestort wordt. '
            + 'Je kunt deze actie niet herstellen.', {
                buttonLabels: ['Annuleer', 'OK']
            });
        if (!result) return;

        const routeOrder = this.props.routeOrder;;
        console.log(routeOrder);

        await firebase.firestore()
            .collection('routeorders')
            .doc(routeOrder.id)
            .update({
                complete: true
            });
    }

    render() {
        const routeOrderOffer = this.state.routeOrderOffer;
        const routeOrder = this.props.routeOrder;
        const isMyOffer = routeOrderOffer && routeOrderOffer.senderUid === AuthStore.user.uid;
        const isMyOrder = routeOrder && routeOrder.senderUid === AuthStore.user.uid;
        const isPickedUp = routeOrderOffer && routeOrderOffer.pickedUp
        const isDone = routeOrderOffer && routeOrderOffer.done;
        const isComplete = routeOrder && routeOrder.complete;

        return (
            <div className="AcceptedDeliveryOffer">
                {isMyOffer
                    ? <div>
                        <h3 style={{ margin: 10 }}>Jij bent de aangewezen bezorger!</h3>
                        {routeOrderOffer && <div>
                            <UserCard uid={routeOrderOffer.senderUid}></UserCard>
                            <div style={{ margin: 10 }}>
                                voor een bedrag van {routeOrderOffer.price || 'Onbekend'} €
                            </div>
                        </div>}
                        <div style={{ margin: 10 }}>
                            {isPickedUp
                                ? <div>
                                    {isDone
                                        ? isComplete
                                            ? <div>
                                                De aanbieder geeft aan u betaald te hebben en dat de bezorging compleet is.
                                            </div>
                                            : <div>
                                                Je hebt de lading bij de bestemming afgeleverd.
                                            </div>
                                        : <div>
                                            Breng de lading naar de aangeven bestemming.<br /><br />
                                            Wanneer je dit hebt afgerond kun je op de knop hier onder klikken.<br /><br />
                                            <Button onClick={this.handleAfgerond}>Klaar!</Button>
                                        </div>}
                                </div>
                                : <div>
                                    Haal de lading bij het aangeven ophaalpunt.<br /><br />
                                    Wanneer je dit hebt afgerond kun je op de knop hier onder klikken.<br /><br />
                                    <Button onClick={this.handlePickedUp}>Klaar!</Button>
                                </div>}

                        </div>
                    </div>
                    : isMyOrder
                        ? <div>
                            <h3 style={{ margin: 10 }}>Je hebt de volgende gebruiker aangegeven als bezorger:</h3>
                            {routeOrderOffer && <div>
                                <UserCard uid={routeOrderOffer.senderUid}></UserCard>
                                <div style={{ margin: 10 }}>
                                    voor een bedrag van {routeOrderOffer.price || 'Onbekend'} €
                                </div>
                                <div style={{ margin: 10 }}>
                                    {isComplete
                                        ? <div>
                                            De bezorging is compleet en je geeft aan de bezorger betaald te hebben.
                                        </div>
                                        : isDone
                                            ? <div>
                                                De gebruiker geeft aan dat de lading bezorgd is.<br /><br />
                                                Als je niet met de app hebt betaald, zorg er dan voor dat de bezorger betaald is, en dat de borg teruggestort wordt.<br /><br />
                                                <Button onClick={this.agreeWithDelivery}>Ga Akkoord</Button><br />
                                        </div>
                                            : isPickedUp
                                                ? <div>
                                                    De gebruiker geeft aan dat hij lading aan het bezorgen is.
                                        </div>
                                                : <div>
                                                    De lading is nog niet opgehaald door de bezorger.
                                        </div>}
                                </div>
                            </div>}
                        </div>
                        : <div>
                            <h3 style={{ margin: 10 }}>Aangewezen bezorger:</h3>
                            {routeOrderOffer && <div>
                                <UserCard uid={routeOrderOffer.senderUid}></UserCard>
                                <div style={{ margin: 10 }}>
                                    voor een bedrag van {routeOrderOffer.price || 'Onbekend'} €
                            </div>
                            </div>}
                        </div>}
            </div>
        );
    }
}

export default AcceptedDeliveryOffer;
