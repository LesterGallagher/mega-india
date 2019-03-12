import React, { Component } from 'react';
import './RouteOfferFlowDiagram.css';
import diagram from './MegaIndia.svg';

class RouteOfferFlowDiagram extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    handleLoad = e => {
        this.setState({
            width: e.target.clientWidth * 2,
            height: e.target.clientHeight * 2,
        });
    }

    render() {
        return (
            <div className="RouteOfferFlowDiagram">
                <div style={{ width: '100vw', height: '100vh', overflow: 'scroll' }}>
                    <img onLoad={this.handleLoad} src={diagram} style={{ width: this.state.width, height: this.state.height }} alt="Route offer flow diagram" />
                </div>
            </div>
        );
    }
}

export default RouteOfferFlowDiagram;
