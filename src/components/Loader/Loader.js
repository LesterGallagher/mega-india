import React, { Component } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
    render() {
        return (
            <svg className={styles.pageLoader}>
                <circle cx="75" cy="75" r="20"></circle>
                <circle cx="75" cy="75" r="35"></circle>
                <circle cx="75" cy="75" r="50"></circle>
                <circle cx="75" cy="75" r="65"></circle>
            </svg>
        );
    }
}

export default Loader;
