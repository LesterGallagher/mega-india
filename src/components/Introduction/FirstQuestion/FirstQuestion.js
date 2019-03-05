import React, { Component } from 'react';
import { Page, CarouselItem, Button, List, ListHeader, ListItem } from 'react-onsenui';
import styles from './FirstQuestion.module.css';
import config from '../../../config';
import { withRouter } from 'react-router-dom';

class FirstQuestion extends Component {

    inCorrect = () => {
        this.props.history.replace('/no-entry?antwoord="Eten"');
    }

    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <h1>Ben jij een echte Oosterhouter?</h1>
                <p>Beantwoord de volgende vragen goed en je krijgt toegang to de app.</p>
                <p>&nbsp;</p>
                <h3>Wat doen we in Oosterhout altijd het eerst?</h3>
                <List className={styles.list}>
                    <ListHeader>Antwoorden</ListHeader>
                    <ListItem onClick={this.inCorrect} tappable>Onze voeten vegen</ListItem>
                    <ListItem onClick={this.props.next} tappable>Eten</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>Midgetgolfen</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>Een station bouwen</ListItem>
                </List>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(FirstQuestion);
