import React, { Component } from 'react';
import './PersonalChat.css';
import Chat from '../Chat/Chat';
import PersonalChatStore from '../../stores/PersonalChatStore';

class PersonalChat extends Component {
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
            <div className="PersonalChat">
                <Chat {...this.props} chatStore={PersonalChatStore} />
            </div>
        );
    }
}

export default PersonalChat;
