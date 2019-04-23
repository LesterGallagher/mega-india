import React, { Component } from 'react';
import styles from './AppSplitter.module.css';
import { Splitter, SplitterContent, SplitterSide, Page, List, ListHeader, ListItem, ListTitle } from 'react-onsenui';
import windowDimensions from 'react-window-dimensions';
import headerBg from './edges.svg';
import { debounce } from '../../lib/util';
import { withRouter } from 'react-router-dom';

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
                    width={250}
                    collapse={true}
                    animation="default"
                    isOpen={this.state.isOpen}
                    onClose={this.handleClose}>
                    <Page>
                        <List>
                            <ListItem className={styles.firstListItem} style={{
                                backgroundImage: `url('${headerBg}')`,
                                height: 200
                            }}>

                            </ListItem>
                            <ListItem onClick={this.openUrl('/new-route')}>
                                Nieuwe Route
                            </ListItem>
                            <ListItem onClick={this.openUrl('/routes-list')}>
                                Bekijk Routes
                            </ListItem>
                            <ListItem onClick={this.openUrl('/chats/personal')}>
                                Chats
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
