import React, { Component } from 'react';
import { Page, CarouselItem, Button, List, ListHeader, ListItem, Navigator } from 'react-onsenui';
import styles from './SecondQuestion.module.css';
import config from '../../../config';
import { withRouter } from "react-router-dom";

class SecondQuestion extends Component {

    inCorrect = () => {
        this.props.history.replace('/no-entry?antwoord="0162"');
    }

    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <h1>Goed gedaan!</h1>
                <p>&nbsp;</p>
                <h3>Wat is het netnummer van Oosterhout</h3>
                <p>&nbsp;</p>
                <List className={styles.list}>
                    <ListHeader>Antwoorden</ListHeader>
                    <ListItem onClick={this.inCorrect} tappable>0481</ListItem>
                    <ListItem onClick={this.props.next} tappable>0162</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>024</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>0168</ListItem>
                </List>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(SecondQuestion);
