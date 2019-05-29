import React, { Component } from 'react';
import styles from './AppSplitter.module.css';
import { Splitter, SplitterContent, SplitterSide, Page, List, Icon, ListHeader, ListItem, ListTitle } from 'react-onsenui';
import windowDimensions from 'react-window-dimensions';
import headerBg from './edges.svg';
import { debounce } from '../../lib/util';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import AppSplitterBanner from '../AppSplitterBanner/AppSplitterBanner';

class AppSplitter extends Component {
    constructor(props) {
        super();
        this.state = {
            isOpen: false
        };

    }

    componentWillMount() {
        window.toggleOnsMenu = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }

    componentWillUnmount() {
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    openUrl = url => () => {
        this.props.history.push(url);
        this.setState({
            isOpen: false
        });
    }

    render() {
        console.log(this.props);
        return (
            <Splitter>
                <SplitterSide
                    side="left"
                    width={300}
                    collapse={true}
                    animation="default"
                    isOpen={this.state.isOpen}
                    onClose={this.handleClose}>
                    <Page>
                        <List className={styles.list}>
                            <ListItem className={styles.firstListItem} style={{
                                backgroundImage: `url('${headerBg}')`,
                                height: 200
                            }}>
                                <AppSplitterBanner />
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.NEW_ROUTE)}>
                                <Icon icon="md-mail-send" />Nieuwe Route
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.ROUTES_LIST)}>
                                <Icon icon="md-car" />Bekijk Routes
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.PERSONAL_CHATS_OVERVIEW)}>
                                <Icon icon="md-comment-text" />Chats
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.FORUM)}>
                                <Icon icon="md-comments" />Forum
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.ACCOUNT)}>
                                <Icon icon="md-account-o" />Account
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.PERSONAL_PROFILE)}>
                                <Icon icon="md-account" />Profiel
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.FAQ)}>
                                <Icon icon="md-help" />FAQ
                            </ListItem>
                            <ListItem onClick={this.openUrl(ROUTES.SETTINGS)}>
                                <Icon icon="md-settings" />Settings
                            </ListItem>
                            <ListItem tappable onClick={this.openUrl(ROUTES.ABOUT)}>
                                <Icon icon="md-info" />About
                            </ListItem>
                        </List>
                    </Page>
                </SplitterSide>
                <SplitterContent>
                    {this.props.children}
                </SplitterContent>
            </Splitter>
        );
    }
}

export default windowDimensions({
    take: () => ({ windowWidth: window.innerWidth, windowHeight: window.innerHeight }),
    debounce: onResize => debounce(onResize, 100),
})(withRouter(AppSplitter));
