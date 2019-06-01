import React, { Component } from 'react';
import styles from './FAQPage.module.css';
import { List, Page, Toolbar, ToolbarButton, Icon, ListItem, ListTitle, ListHeader, BackButton } from 'react-onsenui';
import { withFirebase } from '../Firebase/context';
import faq from './faq.json';
import FAQQuestionPage from './FAQQuestionPage/FAQQuestionPage';
import { withRouter } from 'react-router-dom';
import { FAQ_QUESTION } from '../../constants/routes';
import { slugifyURIComponent } from '../../lib/util';

class FAQPage extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    openUrl = url => () => {
        this.props.history.push(url);
        this.setState({
            isOpen: false
        });
    }

    renderToolbar = () => {
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">
                FAQ
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className={styles.FAQPage}>
                    <List>
                        <ListTitle>Vragen</ListTitle>
                        {faq.questions.map(({ question, author }, key) => {
                            const url = FAQ_QUESTION.replace(':question', slugifyURIComponent(question));
                            return (
                                <ListItem key={key} tappable onClick={this.openUrl(url)}>
                                    <div className="center">
                                        <span className="list-item__title">
                                            {question}
                                        </span>
                                        {author
                                            ? <span className="list-item__subtitle">Auteur: {author}</span>
                                            : null}
                                    </div>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </Page>
        );
    }
}

export default withRouter(withFirebase(FAQPage));
