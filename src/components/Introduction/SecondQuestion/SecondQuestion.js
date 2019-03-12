import React, { Component } from 'react';
import { Page, CarouselItem, Button, List, ListHeader, ListItem, Navigator } from 'react-onsenui';
import styles from './SecondQuestion.module.css';
import config from '../../../config';
import { withRouter } from "react-router-dom";

class SecondQuestion extends Component {

    inCorrect = () => {
        this.props.history.push('/no-entry?antwoord=' + encodeURIComponent('Wij bieden alleen onze diensten') + '&antwoord2=' + encodeURIComponent('aan in Nederland.'));
    }

    render() {
        return (<CarouselItem className={styles.root}>
            <div className={styles.alignCenter}>
                <h1>Waar wil je gaan bezorgen of adverteren?</h1>
                <p>&nbsp;</p>
                <p>Deze app werkt alleen in Nederland.</p>
                <p>&nbsp;</p>
                <List className={styles.list}>
                    <ListHeader>Antwoorden</ListHeader>
                    <ListItem onClick={this.props.next} tappable>In Nederland</ListItem>
                    <ListItem onClick={this.props.next} tappable>In de Randstad</ListItem>
                    <ListItem onClick={this.props.next} tappable>Weet ik nog niet</ListItem>
                    <ListItem onClick={this.inCorrect} tappable>In het buitenland</ListItem>
                </List>
            </div>
        </CarouselItem>);
    }
}

export default withRouter(SecondQuestion);
