import React, { Component } from 'react';
import styles from './Message.module.css';
import { format } from 'timeago.js';

class Message extends Component {
    render() {
        const className = [styles.message];
        if (this.props.position === 'right') className.push(styles.right);
        else className.push(styles.left);
        return (
            <div style={{ height: this.props.height }} className={className.join(' ')}>
                {this.props.name ? <small className={styles.name}>{this.props.name}</small> : null}
                {this.props.avatar ? <div className={styles.avatar}>
                    <img src={this.props.avatar} alt="User Avatar"></img>
                </div> : null}
                <div className={styles.contentWrapper} style={{ backgroundColor: this.props.position === 'right' ? '#ec6e08' : '#63a0b5' }}>
                    <span className={styles.content}>{this.props.children}</span>
                    <small className={styles.timestamp}>{format(this.props.timestamp, 'nl')}</small>
                </div>
            </div>
        );
    }
}

export default Message;
