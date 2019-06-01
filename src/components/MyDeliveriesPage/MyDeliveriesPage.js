import React, { Component } from 'react';
import styles from './MyDeliveriesPage.module.css';
import { List, Page, Toolbar, ToolbarButton, Icon, ListItem, ListTitle, ListHeader, BackButton, Card } from 'react-onsenui';
import * as utils from '../../lib/geo';
import { withFirebase } from '../Firebase/context';
import { withRouter } from 'react-router-dom';
import { slugifyURIComponent } from '../../lib/util';
import RoutesList from '../RoutesList/RoutesList';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';
import AuthStore from '../../stores/AuthStore';
import MyDeliveriesListSearch from '../MyDeliveriesListSearch/MyDeliveriesListSearch';

class MyDeliveriesPage extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    render() {
        return (
            <Page renderToolbar={() => <ToolbarNormal name="Route lijst" />}>
                <Card>
                    <MyDeliveriesListSearch />
                </Card>
            </Page>
        );
    }
}

export default withFirebase(MyDeliveriesPage);
