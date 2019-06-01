import React, { Component } from 'react';
import styles from './MessageList.module.css';
import PublicChatStore from '../../../stores/PublicChatStore';
import { ChatMessage } from '../../../lib/chats/chat-message';
import AuthStore from '../../../stores/AuthStore';
import Message from '../Message/Message';
import { tranformChatMessageFormat } from '../../../lib/chats/chat-message-format';

const fetchCount = 100;

class MessageList extends Component {
    constructor(props) {
        super();
        this.state = {
            count: fetchCount,
            messages: [],
        };
    }

    componentWillMount() {
        this.initializeMessageList(this.props);
    }

    componentWillUnmount() {
        PublicChatStore.removeListener('change', this.handleChatStoreChange);
        this.messagesObserver.off('value', this.handleThreadValue);
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (nextProps.thread === this.props.thread) return;
        this.initializeMessageList(nextProps);
    }

    handleChatStoreChange = () => {
    }

    initializeMessageList = (props) => {
        if (this.messagesObserver) this.messagesObserver.off('value', this.handleThreadValue);
        this.setState({
            count: fetchCount,
            messages: [],
        });
        this.sticky = true;
        const messagesObserver = this.messagesObserver = props.thread.threadObserver
            .orderByChild('timestamp')
            .limitToLast(this.state.count);

        messagesObserver.on('value', this.handleThreadValue);
    }

    handleThreadValue = snapshot => {
        const val = snapshot.val();
        let lastMsg = null;
        const messages = Object.keys(val || {}).map(id => {
            const msg = val[id];
            const inline = lastMsg
                && lastMsg.senderUid === msg.senderUid
                || msg.isSelf;
            return new ChatMessage(
                msg.content,
                msg.timestamp,
                msg.senderName,
                msg.senderUid,
                msg.senderUid === AuthStore.user.uid,
                id,
                inline
            );
        });
        this.setState({ messages });
        this.props.onMessagesLoaded();
    }

    renderRow = msg => {
        const avatar = msg.inline || msg.isSelf ? null : "https://www.w3schools.com/howto/img_avatar.png";
        const name = msg.inline || msg.isSelf ? null : msg.senderName;
        const jsx = (
            <Message
                key={msg.objectID}
                name={name}
                position={msg.isSelf ? 'right' : 'left'}
                timestamp={msg.timestamp}
                avatar={avatar}>
                {tranformChatMessageFormat(msg, name)}
            </Message>);
        return jsx;
    }

    setRef = ref => {
        this.ref = ref;
    }

    setScroll = () => {
        this.sticky = this.ref.scrollTop + this.ref.clientHeight > this.ref.scrollHeight - 100;
    }

    componentDidUpdate() {
        if (this.sticky) this.ref.scrollTop = this.ref.scrollHeight;
    }

    render() {
        if (this.ref) this.setScroll();
        return (
            <div ref={this.setRef} className={styles.root}>
                {this.state.messages.map(this.renderRow)}
            </div>
        );
    }
}

export default MessageList;
