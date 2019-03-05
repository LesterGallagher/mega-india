import React, { Component } from 'react';
import { Page, Splitter, SplitterContent, SplitterSide, ProgressCircular, CarouselItem } from 'react-onsenui';
import Loader from '../../components/Loader/Loader';
import styles from './CarouselProgress.module.css';
import config from '../../config';

class CarouselProgress extends Component {
    render() {
        const items = [];
        const style = {
            backgroundColor: this.props.color,
            borderColor: this.props.color
        };
        for(let i = 0; i < this.props.length; i++) {
            let filled = i <= this.props.index;
            let classes = [filled ? styles.filled : styles.empty, styles.dot].join(' ');
            items.push(<span 
                key={i}
                style={style}
                className={classes} />);
        }
        return (
            <div className={styles.dots}>
                { items }
            </div>
        );
    }
}

export default CarouselProgress;
