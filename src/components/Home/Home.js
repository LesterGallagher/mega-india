import React, { Component } from 'react';
import ons from 'onsenui';
import { Page, Toolbar, Button, ToolbarButton, Icon } from 'react-onsenui';
import { Link } from 'react-router-dom';
import ToolbarNormal from '../ToolbarNormal/ToolbarNormal';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const toolbar = <ToolbarNormal title="Home" />;
        return (<Page renderToolbar={() => toolbar}>
            <Link to={'/nieuwe-route'}><Button>Nieuwe route!</Button></Link>
        </Page>);
    }
}

export default Home;