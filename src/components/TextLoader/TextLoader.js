import React, { Component } from 'react';
import styles from './TextLoader.module.css';
import propTypes from 'prop-types';

const TextLoader = ({ loading, width, children }) => {
    const content = loading
        ? <span style={{ width: width }} className={styles.loading}>&nbsp;</span>
        : children;

    return content;
};

TextLoader.propTypes = {
    loading: propTypes.bool.isRequired,
    width: propTypes.number
}

TextLoader.defaultProps = {
    width: 100
};

export default TextLoader;

