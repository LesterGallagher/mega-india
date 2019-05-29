import React, { Component } from 'react';
import styles from './AboutPage.module.css';
import { Toolbar, ToolbarButton, Icon, Page, ProgressBar, Row, Col, Card } from 'react-onsenui';
import about from './about.json';
import AspectRatio from '../AspectRatio/AspectRatio';
import colors from '../../style/colors.css';
import { withRouter } from 'react-router-dom';


class AboutPage extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    renderToolbar = () => {
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">
                {about.title}
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    render() {
        return (
            <Page className={styles.AboutPage} renderToolbar={this.renderToolbar}>
                <Row>
                    <Col>
                        <Card onClick={() => window.open(`https://esstudio.site/contact`, '_blank')} style={{ backgroundColor: colors.primary }}>
                            <AspectRatio ratio={1}>
                                <div className={styles.icon}><Icon icon="md-bug" /></div>
                                <div className={styles.text}>Bug rapporteren</div>
                            </AspectRatio>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={() => window.open(`https://esstudio.site/contact`, '_blank')} style={{ backgroundColor: '#fb5353' }}>
                            <AspectRatio ratio={1}>
                                <div className={styles.icon}><Icon icon="md-email" /></div>
                                <div className={styles.text}>Ontwikkelaar Contact (mail)</div>
                            </AspectRatio>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={() => window.open(`https://ikverstaat.nl`, '_blank')} style={{ backgroundColor: '#00675c' }}>
                            <AspectRatio ratio={1}>
                                <div className={styles.icon}><Icon icon="md-account-calendar" /></div>
                                <div className={styles.text}>Opdrachtgever Contact (mail)</div>
                            </AspectRatio>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={() => window.open(`https://github.com/LesterGallagher/mega-india`, '_blank')} style={{ backgroundColor: '#24292e' }}>
                            <AspectRatio ratio={1}>
                                <div className={styles.icon}><Icon icon="md-github" /></div>
                                <div className={styles.text}>Bron materialen</div>
                            </AspectRatio>
                        </Card>
                    </Col>
                </Row>
                <div className={styles.textWrapper} dangerouslySetInnerHTML={{ __html: about.text}} />
            </Page>

               
     

        );
    }
}

export default withRouter(AboutPage);
