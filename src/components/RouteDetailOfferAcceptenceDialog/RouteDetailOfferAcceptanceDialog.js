import React, { Component } from 'react';
import { Page, Card, Dialog, Button, ListItem, List, Input } from 'react-onsenui';
import styles from './RouteDetailOfferAcceptanceDialog.module.css';
import firebase from '../../lib/firebase';
import NotFound from '../NotFound/NotFound';
import AuthStore from '../../stores/AuthStore';
import UserCard from '../UserCard/UserCard';
import { routeCostsColor } from '../../lib/route-costs';
import { notifyDeliveryGuyAccepted } from '../../services/route-order-offers';

const greyImgURI = 'data:image/png;base64,iVBORw0KGgoAAAAN'
    + 'SUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEWZmZl86KQWAAA'
    + 'ADklEQVQY02NgGAWDCQAAAZAAAcWb20kAAAAASUVORK5CYII=';

class RouteDetailOfferAcceptanceDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async () => {
    }

    componentWillUnmount() {
    }

    handleAccept = async () => {
        const { routeOrder, routeOrderOffer } = this.props;
        await firebase.firestore()
            .collection('routeorders')
            .doc(routeOrder.objectID)
            .update({
                acceptedRouteOrderOfferId: routeOrderOffer.objectID,
            });
        notifyDeliveryGuyAccepted(routeOrder, routeOrderOffer);
    }

    renderRouteOrderOfferAccept = () => {
        const { routeOrder, routeOrderOffer } = this.props;
        return (
            <div>
                <List>
                    <ListItem>
                        <div style={{ width: '100%' }}>
                            <UserCard onAccept={this.handleAccept} uid={routeOrderOffer.senderUid} />
                        </div>
                    </ListItem>
                    <ListItem>
                        <span style={{ backgroundColor: routeCostsColor(routeOrder.cost) }}>{routeOrder.cost} € </span>
                    </ListItem>
                    <ListItem>
                        Let op. In de toekomst kunt u via deze app betalen.

                        Betalen via de app is veiliger omdat de aanbieder van te voren het geld betaald.
                        De bezorger krijgt het geld pas wanneer hij de lading heeft bezorgd.

                        Het is ook belangrijk om een borg te vragen als de lading veel geld waard is.
                        In de toekomst kan de bezorger deze borg direct naar de app overmaken,
                        nu moet u dat zelf met de bezorger regelen.
                    </ListItem>
                    <ListItem>
                        <div className="left"><Button onClick={this.handleAccept}>Accepteren</Button></div>
                        <div className="center"></div>
                        <div className="right"><Button onClick={this.props.onClose}>Sluiten</Button></div>
                    </ListItem>
                </List>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Dialog onCancel={this.onCancel}
                    isOpen={!!this.props.isOpen}
                    className={'RouteDetailOfferAcceptanceDialog ' + styles.dialog}
                    cancelable>
                    <Page>
                        {!this.props.routeOrderOffer
                            ? <div>
                                <NotFound />
                                <Button onClick={this.props.onClose}>Sluiten</Button>
                            </div>
                            : this.renderRouteOrderOfferAccept()}
                    </Page>
                </Dialog>
            </div>
        );
    }
}

export default RouteDetailOfferAcceptanceDialog;
