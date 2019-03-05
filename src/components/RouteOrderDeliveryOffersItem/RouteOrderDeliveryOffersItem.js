import React, { Component } from 'react';
import './RouteOrderDeliveryOffersItem.css';
import { ListItem, Fab, Icon } from 'react-onsenui';
import AuthStore from '../../stores/AuthStore';
import { withRouter } from 'react-router-dom';

class RouteOrderDeliveryOffersItem extends Component {
    constructor(props) {
        super();
        this.state = {
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

    render() {
        const routeOrder = this.props.routeOrder;
        const { price, senderName, senderUid } = this.props.routeOrderOffer;
        const isMyOffer = senderUid === AuthStore.user.uid;
        const isMyOrder = routeOrder.senderUid === AuthStore.user.uid;
        return (
            <div className="RouteOrderDeliveryOffersItem">
                <ListItem>
                    <div className="left">
                        {price} €
                    </div>
                    <div className="right">
                        {senderName}&nbsp;
                        {isMyOrder && <Fab onClick={this.handleMyOrderCommentClick}><Icon icon="fa-comment-alt" /></Fab>}
                    </div>
                </ListItem>
            </div>
        );
    }
}

export default withRouter(RouteOrderDeliveryOffersItem);
