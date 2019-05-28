import React, { Component } from 'react';
import styles from './ExternalLink.module.css';

class ExternalLink extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <a target="_blank" rel="nofollow noopener noreferrer" className={styles.ExternalLink} {...this.props}>
                {this.props.children}
            </a>
        );
    }
}

export default ExternalLink;
