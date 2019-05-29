import React, { Component } from 'react';
import styles from './PublicChatsListItem.module.css';
import { getProfileImage } from '../../../lib/user';
import { List, ListItem } from 'react-onsenui';
import { withRouter } from 'react-router-dom';

const greyImgURI = 'data:image/png;base64,iVBORw0KGgoAAAAN'
    + 'SUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEWZmZl86KQWAAA'
    + 'ADklEQVQY02NgGAWDCQAAAZAAAcWb20kAAAAASUVORK5CYII=';

class PublicChatsListItem extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentDidMount = async () => {
        const chatItem = await this.props.publicChatPromise;
        this.setState({
            chatItem: chatItem,
            chatItemLoaded: true
        });
        const profileImage = await getProfileImage(chatItem.uid);
        this.setState({
            profileImage: profileImage,
            profileImageLoaded: true
        });
    }

    componentWillUnmount() {
    }

    onClick = async () => {
        await this.props.publicChatPromise;
        this.props.history.push(`/chats/public/${this.state.chatItem.uid}`);
    }

    render() {
        const chatItemLoaded = this.state.chatItemLoaded;
        const chatItem = this.state.chatItem || {};
        const userPublicData = chatItem.userPublicData || {};
        const src = this.state.profileImage || greyImgURI;
        const alt = (userPublicData.displayName || 'User') + ' avatar';

        return (
            <ListItem tappable
                modifier="chevron"
                className="PublicChatsListItem"
                onClick={this.onClick}>
                <div className="left">
                    <img width="50" height="50"
                        className="list-item__thumbnail"
                        alt={alt}
                        src={src} />
                </div>
                <div className="center">
                    <div className={chatItemLoaded ? null : styles.greyDisplayName}>
                        {userPublicData.displayName || 'Anonymous'}
                    </div>
                </div>
                <div className="right">

                </div>
            </ListItem>
        );
    }
}

export default withRouter(PublicChatsListItem);
