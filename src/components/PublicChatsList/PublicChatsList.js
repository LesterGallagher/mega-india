import React, { Component } from 'react';
import './PublicChatsList.module.css';
import { List, ListItem } from 'react-onsenui';
import PublicChatsListItem from './PublicChatsListItem/PublicChatsListItem';

class PublicChatsList extends Component {
    constructor(props) {
        super();
        this.state = {

        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    renderListItem = (item, key) => {
        return (
            <PublicChatsListItem publicChatPromise={item} key={key} />
        );
    }

    render() {
        if (!this.props.publicChatPromises) return null;
        return (
            <div className="PublicChatsList">
                <List>
                    {this.props.publicChatPromises.map(this.renderListItem)}
                </List>
            </div>
        );
    }
}

export default PublicChatsList;
