import React, { Component } from 'react';
import styles from './RouteOrderDeliveryOffersItem.module.css';
import { ListItem, Fab, Icon } from 'react-onsenui';
import AuthStore from '../../stores/AuthStore';
import { withRouter } from 'react-router-dom';
import RouteDetailOfferAcceptanceDialog from '../RouteDetailOfferAcceptenceDialog/RouteDetailOfferAcceptanceDialog';

class RouteOrderDeliveryOffersItem extends Component {
    constructor(props) {
        super();
        this.state = {
            routeOrderOfferOpen: false
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    handleMyOrderCommentClick = () => {
        const { price, senderName, senderUid } = this.props.routeOrderOffer;
        this.props.history.push('/chats/personal/' + senderUid);
    }

    toggleAcceptOrderDialog = () => {
        this.setState({
            routeOrderOfferOpen: !this.state.routeOrderOfferOpen
        });
    }

    render() {
        const routeOrder = this.props.routeOrder;
        const { price, senderName, senderUid } = this.props.routeOrderOffer;
        const isMyOffer = senderUid === AuthStore.user.uid;
        const isMyOrder = routeOrder.senderUid === AuthStore.user.uid;
        return (
            <div className={styles.offerItem}>
                <ListItem>
                    <div className="left">
                        {price} €
                    </div>
                    <div className={'right ' + styles.offerItemRight}>
                        {senderName}&nbsp;
                        {isMyOrder && <Fab onClick={this.handleMyOrderCommentClick}><Icon icon="fa-comment-alt" /></Fab>}
                        {isMyOrder && <Fab onClick={this.toggleAcceptOrderDialog}><Icon icon="md-assignment-check" /></Fab>}
                        {isMyOffer && <Icon icon="md-assignment-account" />}
                    </div>
                </ListItem>
                <RouteDetailOfferAcceptanceDialog
                    onClose={this.toggleAcceptOrderDialog}
                    isOpen={this.state.routeOrderOfferOpen}
                    routeOrder={routeOrder}
                    routeOrderOffer={this.props.routeOrderOffer} />
            </div>
        );
    }
}

export default withRouter(RouteOrderDeliveryOffersItem);
