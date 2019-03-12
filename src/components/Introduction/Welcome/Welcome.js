import React, { Component } from 'react';
import { Page, Splitter, SplitterContent, SplitterSide, CarouselItem, Card, Button } from 'react-onsenui';
import logo from '../../../images/logo.png';
import config from '../../../config';
import styles from './Welcome.module.css'
import CarouselProgress from '../../CarouselProgress/CarouselProgress';

class Welcome extends Component {
    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <div className={styles.lightBgCard}>
                <h1>{config.name}</h1>
                <p style={{ margin: 'auto', width: '50%', minWidth: 300, maxWidth: '100%' }}>De makkelijkste plek om bezorgingen te adverteren of een centje bij te verdienen als bezorger.</p>
                </div>
                <p>&nbsp;</p>
                <figure className={styles.figure}>
                    <img className={styles.img} src={logo} alt="Logo" />
                </figure>
            </div>
            <div className={styles.alignMiddle}>
                <Button style={{backgroundColor: '#1398d4'}} onClick={this.props.next}>Volgende</Button>
            </div>
        </CarouselItem>);
    }
}

export default Welcome;
