import React, { Component } from 'react';
import styles from './FAQPage.module.css';
import { List, Page, Toolbar, ToolbarButton } from 'react-onsenui';
import { withFirebase } from '../Firebase/context';

class FAQPage extends Component {
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
            <div className={styles.FAQPage}>
                FAQPage Component
            </div>
        );
    }
}

export default withFirebase(FAQPage);
