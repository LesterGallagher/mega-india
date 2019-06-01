import React, { Component } from 'react';
import styles from './ForumPage.module.css';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar, Row, Col, Card, List, ListItem, ListTitle, ListHeader } from 'react-onsenui';
import PublicChatsOverview from '../PublicChatsOverview/PublicChatsOverview';



class ForumPage extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount = async () => {
    }

    componentWillUnmount() {
    }



   

    renderToolbar = () => {
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">
                Forum
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        return (
            <Page className={styles.ForumPage} renderToolbar={this.renderToolbar}>
                <h5 style={{ marginLeft: 10 }}>Onderwerpen</h5>
                {/* <Card style={{ padding: 0 }}>
                    <PublicChatsList publicChatPromises={this.state.publicChatPromises} />
                </Card> */}
                <PublicChatsOverview path="/" />
            </Page>
        );
    }
}

export default ForumPage;
