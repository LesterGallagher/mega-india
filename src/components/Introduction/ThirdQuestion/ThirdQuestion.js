import React, { Component } from 'react';
import { Page, CarouselItem, Button, List, ListHeader, ListItem } from 'react-onsenui';
import styles from './ThirdQuestion.module.css';
import { withRouter } from 'react-router-dom';
import config from '../../../config';

class ThirdQuestion extends Component {

    inCorrect = () => {
        this.props.history.replace(`/no-entry?antwoord=${encodeURIComponent('"De vijf slotjes" of')}&antwoord2=${encodeURIComponent('"De Heilige Driehoek"')}`);
    }

    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <h1>Prima!</h1>
                <p>&nbsp;</p>
                <h3>"De Blauwe Camer" maakt deel uit van?</h3>
                <p>&nbsp;</p>
                <List className={styles.list}>
                    <ListHeader>Antwoorden</ListHeader>
                    <ListItem onClick={this.props.next} tappable>De vijf slotjes</ListItem>
                    <ListItem onClick={this.props.next} tappable>De Heilige Driehoek</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>Het Hertogenpad</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>De uitgaansgelegenheden in Oosterhout</ListItem>
                </List>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(ThirdQuestion);
