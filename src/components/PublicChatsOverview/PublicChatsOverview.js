import React, { Component } from 'react';
import styles from './PublicChatsOverview.module.css';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar, Row, Col, Card, List, ListItem, ListTitle, ListHeader } from 'react-onsenui';
import { withRouter } from 'react-router-dom';
import firebase from '../../lib/firebase';
import AuthStore from '../../stores/AuthStore';
import PublicChatStore from '../../stores/PublicChatStore';
import get from 'lodash/get';

class PublicChatsOverview extends Component {
    constructor(props) {
        super();
        this.state = {
            chatSubjects: []
        };

    }

    componentWillMount = async () => {
    }

    componentWillUnmount() {
    }

    componentDidMount = async () => {
        await firebase.ready;
        await AuthStore.readyPromise;
        const globalChatSubjects = await PublicChatStore.getChatSubjectsFlat();
        const path = this.props.path.trim().replace(/(^\/|\/$)/, '');
        const chatSubjects = globalChatSubjects.filter(x => x.slug.startsWith(path) && x.slug !== path);
        this.setState({ chatSubjects });
    }

    handleChatClick = (e, path) => {
        e.stopPropagation();
        this.props.history.push( `/chats/public${path}`);
    }

    handleChatNodeClick = (e, path) => {
        e.stopPropagation();
        this.props.history.push(`/chats/public-subjects${path}`);
    }

    recursiveChatSubjects = (path, subjects) => {
        return subjects.map((subject, i) => {
            const fullPath = path + '/' + subject.slug;
            return (<ListItem
                onClick={subject.isLeaf
                    ? e => this.handleChatClick(e, fullPath)
                    : e => this.handleChatNodeClick(e, fullPath)}
                key={i}>

                <div className="left">{subject.title}</div>
                <div className="center"></div>
                <div className="right"></div>
                {subject.sub && <div className="expandable-content">
                    <List>
                        {this.recursiveChatSubjects(fullPath, subject.sub)}
                    </List>
                </div>}
            </ListItem>)
        });
    }

    render() {
        return (
            <List>
                {this.recursiveChatSubjects('', this.state.chatSubjects)}
            </List>
        );
    }
}

export default withRouter(PublicChatsOverview);
