import React, { Component } from 'react';
import { Card, Page } from 'react-onsenui';
import './PersonalChatsOverview.css';
import PersonalChatsList from '../PersonalChatsList/PersonalChatsList';
import PersonalChatStore from '../../stores/PersonalChatStore';
import firebase from '../../lib/firebase';
import PersonalChatListItem from '../../lib/chats/personal-chat-list-item';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import AuthStore from '../../stores/AuthStore';

class PersonalChatsOverview extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentDidMount = async () => {
        await firebase.ready;
        await AuthStore.readyPromise;
        const personalChats = await PersonalChatStore.getAllPersonalChats();
        this.setState({
            personalChatPromises: personalChats.map(chatInfo => PersonalChatListItem.create(chatInfo))
        });
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Page className="PersonalChatsOverview" renderToolbar={() => <ToolbarNormal name="Chats overzicht" />}>
                <Card style={{ padding: 0 }}>
                    <h5 style={{ marginLeft: 10 }}>Chats overzicht</h5>
                    <PersonalChatsList personalChatPromises={this.state.personalChatPromises} />
                </Card>
            </Page>
        );
    }
}

export default PersonalChatsOverview;
