import React, { Component } from 'react';
import './PersonalChatsList.css';
import { List, ListItem } from 'react-onsenui';
import PersonalChatsListItem from './PersonalChatsListItem/PersonalChatsListItem';

class PersonalChatsList extends Component {
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
            <PersonalChatsListItem personalChatPromise={item} key={key} />
        );
    }

    render() {
        if (!this.props.personalChatPromises) return null;
        return (
            <div className="PersonalChatsList">
                <List>
                    {this.props.personalChatPromises.map(this.renderListItem)}
                </List>
            </div>
        );
    }
}

export default PersonalChatsList;
