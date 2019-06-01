import React, { Component } from 'react';
import styles from './FindCourierPage.module.css';
import UserSearch from '../UserSearch/UserSearch';
import { List, Page, Toolbar, ToolbarButton, Icon, ListItem, ListTitle, ListHeader, BackButton, Card } from 'react-onsenui';
import * as utils from '../../lib/geo';
import { withFirebase } from '../Firebase/context';
import { withRouter } from 'react-router-dom';
import { slugifyURIComponent } from '../../lib/util';
import RoutesList from '../RoutesList/RoutesList';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import AuthStore from '../../stores/AuthStore';

class FindCourierPage extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Page className={styles.FindCourierPage} renderToolbar={() => <ToolbarNormal title="Zoek Koeriers" />}>
                <Card>
                    <UserSearch />
                </Card>
            </Page>
        );
    }
}

export default FindCourierPage;
