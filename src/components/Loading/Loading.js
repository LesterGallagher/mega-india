import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import styles from './Loading.module.css';

class Loading extends Component {
    render() {
        return (<div className={styles.loading}>
            <Loader />
        </div>);
    }
}

export default Loading;
