import React, { Component } from 'react';
import styles from './ImportantInput.module.css';

class ImportantInput extends Component {
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
            <div className={styles.ImportantInput}>
                <input {...this.props} />
            </div>
        );
    }
}

export default ImportantInput;
