import React, { Component } from 'react';
import { Page, CarouselItem, Button, List, ListHeader, ListItem } from 'react-onsenui';
import styles from './FirstQuestion.module.css';
import config from '../../../config';
import { withRouter } from 'react-router-dom';

class FirstQuestion extends Component {

    inCorrect = () => {
        this.props.history.push('/no-entry?antwoord="Eten"');
    }

    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <h1>Wat wil je doen?</h1>
                <p>&nbsp;</p>
                <p>Waar ben je in geïnteresseerd?</p>
                <p>&nbsp;</p>
                <List className={styles.list}>
                    <ListHeader>Antwoorden</ListHeader>
                    <ListItem onClick={this.props.next} tappable>Duurzamer Adverteren</ListItem>
                    <ListItem onClick={this.props.next} tappable>Duurzamer bezorgen</ListItem>
                    <ListItem onClick={this.props.next} tappable>Beide</ListItem>
                    <ListItem onClick={this.props.next} tappable>Iets anders/Weet ik nog niet</ListItem>
                </List>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(FirstQuestion);
