import React, { Component } from 'react';
import styles from './PublicChatSubjectOverview.module.css';
import { Toolbar, ToolbarButton, BackButton, Icon, Page, ProgressBar, Row, Col, Card, List, ListItem, ListTitle, ListHeader } from 'react-onsenui';
import { withRouter } from 'react-router-dom';
import PublicChatsOverview from '../PublicChatsOverview/PublicChatsOverview';



class PublicChatSubjectOverview extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    renderToolbar = () => {
        return (<Toolbar>
            <div className="left">
                <BackButton onClick={this.props.history.goBack}></BackButton>
            </div>
            <div className="center">
                Forum
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        const slug = this.props.match.params[0];
        return (
            <Page className={styles.ForumPage} renderToolbar={this.renderToolbar}>
                <h5 style={{ marginLeft: 10 }}>Chats overzicht</h5>
                {/* <Card style={{ padding: 0 }}>
                    <PublicChatsList publicChatPromises={this.state.publicChatPromises} />
                </Card> */}
                <PublicChatsOverview path={slug} />
            </Page>
        );
    }
}

export default withRouter(PublicChatSubjectOverview);
