import React, { Component } from 'react';
import { Page, Toolbar, Button } from 'react-onsenui';
import styles from './ChatInput.module.css';
import Textarea from 'react-textarea-autosize';
import AuthStore from '../../../stores/AuthStore';
import { getDisplayName } from '../../../lib/user';

class ChatInput extends Component {
    constructor(props) {
        super();

        this.state = {
            text: '',
        }
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    }

    handleSendClick = e => {
        const newMessage = {
            content: this.state.text,
            senderName: getDisplayName(AuthStore.user),
            senderUid: AuthStore.user.uid,
            timestamp: Date.now()
        };
        this.props.threadObserver.push(newMessage);
        this.setState({
            text: ''
        });
        if (this.textareaRef) this.textareaRef.focus();
    }

    setTextareaRef = ref => {
        this.textareaRef = ref;
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.textareaWrapper}>
                    <Textarea inputRef={this.setTextareaRef} className={styles.textarea}
                        value={this.state.text}
                        onChange={this.handleInputChange} />
                </div>
                <Button className={styles.button}
                    disabled={this.state.text.length === 0}
                    onClick={this.handleSendClick}
                    modifier="large--cta">
                    
                    Verzenden
                </Button>
            </div>
        );
    }
}

export default ChatInput;
