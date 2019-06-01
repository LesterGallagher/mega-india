import React, { Component } from 'react';
import { List, Page, Toolbar, ToolbarButton, Icon, ListItem, ListTitle, ListHeader, BackButton } from 'react-onsenui';
import styles from './FAQQuestionPage.module.css';
import faq from '../faq.json';
import { slugifyURIComponent } from '../../../lib/util';
import { withRouter } from 'react-router-dom';

const questions = Object.assign({}, ...faq.questions.map(item => ({ [slugifyURIComponent(item.question)]: item })));

class FAQQuestionPage extends Component {
    constructor(props) {
        super();
        this.state = {
        };

        this.question = questions[props.match.params.question || props.question];
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    renderToolbar = () => {
        const { question, answer, author } = this.question;
        return (<Toolbar>
            <div className="left">
                <BackButton onClick={this.props.history.goBack}></BackButton>
            </div>
            <div className="center">
                {question}
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        const { question, answer, author } = this.question;
        return (
            <Page renderToolbar={this.renderToolbar} className={styles.FAQQuestionPage}>
                <List>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">
                                {question}
                            </span>
                            {author
                                ? <span className="list-item__subtitle">Auteur: {author}</span>
                                : null}
                        </div>
                    </ListItem>
                    <ListItem>
                        <div dangerouslySetInnerHTML={{ __html: answer }} />
                    </ListItem>
                </List>
            </Page>
        );
    }
}

export default withRouter(FAQQuestionPage);
