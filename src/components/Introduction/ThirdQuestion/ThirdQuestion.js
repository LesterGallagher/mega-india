import React, { Component } from 'react';
import { Page, CarouselItem, Button, List, ListHeader, ListItem } from 'react-onsenui';
import styles from './ThirdQuestion.module.css';
import { withRouter } from 'react-router-dom';
import config from '../../../config';

class ThirdQuestion extends Component {

    inCorrect = () => {
        this.props.history.push('/no-entry?antwoord='
        + encodeURIComponent('Je moet het eens zijn met de')
        + '&antwoord2='
        + encodeURIComponent('algemene voorwaarden.'));
    }

    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <h1>Ben je akkoord?</h1>
                <p>&nbsp;</p>
                <p>Ben je het eens met onze algemene voorwaarden en ons beleid?<br />
                Wil je deze app op een verantwoordelijke manier gaan gebruiken?</p>
                <p>&nbsp;</p>
                <List className={styles.list}>
                    <ListHeader>Antwoorden</ListHeader>
                    <ListItem onClick={this.props.next} tappable>Ja</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>Nee</ListItem>
                </List>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(ThirdQuestion);
