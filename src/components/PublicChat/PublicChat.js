import React, { Component } from 'react';
import './PublicChat.css';
import Chat from '../Chat/Chat';
import PublicChatStore from '../../stores/PublicChatStore';

class PublicChat extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="PublicChat">
                <Chat {...this.props} chatStore={PublicChatStore} />
            </div>
        );
    }
}

export default PublicChat;
