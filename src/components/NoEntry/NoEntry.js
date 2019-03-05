import React, { Component } from 'react';
import { Page, Splitter, SplitterContent, SplitterSide, CarouselItem, Card, Button } from 'react-onsenui';
import config from '../../config';
import styles from './NoEntry.module.css'
import { parse } from 'query-string'
import NoEntryImage from './NoEntryImage';
import { withRouter } from 'react-router-dom'

class NoEntry extends Component {
    render() {
        const params = parse(this.props.location.search);
        const { antwoord, antwoord2 } = params;
        return (<Page className={styles.root}>
            <div className={styles.alignCenter}>
                <div className={styles.lightBgCard}>
                    <h1>Onjuist antwoord...</h1>
                </div>
                <p>&nbsp;</p>
                <figure className={styles.figure}>
                    <NoEntryImage antwoord={antwoord} antwoord2={antwoord2} />
                </figure>
            </div>
            <div className={styles.alignMiddle}>
                <Button onClick={() => this.props.history.replace('/')}>Terug</Button>
            </div>
        </Page>);
    }
}

export default withRouter(NoEntry);
