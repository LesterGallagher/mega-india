import React, { Component } from 'react';
import { Card, Page } from 'react-onsenui';
import './PersonalChatsOverview.css';
import PersonalChatsList from '../PersonalChatsList/PersonalChatsList';
import PersonalChatStore from '../../stores/PersonalChatStore';
import { firebaseReady, isLoggedIn } from '../../lib/authentication';
import PersonalChatListItem from '../../lib/chats/personal-chat-list-item';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';

class PersonalChatsOverview extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentDidMount = async () => {
        await firebaseReady;
        await isLoggedIn;
        const personalChats = await PersonalChatStore.getAllPersonalChats();
        this.setState({
            personalChatPromises: personalChats.map(chatInfo => PersonalChatListItem.create(chatInfo))
        }, console.log);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Page className="PersonalChatsOverview" renderToolbar={() => <ToolbarNormal name="Chats overzicht" />}>
                <h2 style={{ marginLeft: 10 }}>Chats overzicht</h2>
                <Card style={{ padding: 0 }}>
                    <PersonalChatsList personalChatPromises={this.state.personalChatPromises} />
                </Card>
            </Page>
        );
    }
}

export default PersonalChatsOverview;
