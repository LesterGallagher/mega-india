import React, { Component } from 'react';
import { Page, Splitter, SplitterContent, SplitterSide, Carousel } from 'react-onsenui';
import config from '../../config';
import Welcome from './Welcome/Welcome';
import styles from './Introduction.module.css';
import CarouselProgress from '../../components/CarouselProgress/CarouselProgress';
import FirstQuestion from './FirstQuestion/FirstQuestion';
import SecondQuestion from './SecondQuestion/SecondQuestion';
import ThirdQuestion from './ThirdQuestion/ThirdQuestion';
import Login from './Login/Login';
import { setStatusBarColor } from '../../lib/statusbar';

class Introduction extends Component {
    constructor() {
        super();
        this.state = {
            index: 0
        }
        this.setColor();
    }

    handleNext = () => {
        this.setState({
            index: this.state.index + 1
        }, this.setColor);
    }

    setColor = () => {
        const colors = ['#ec6e08', '#63a0b5', '#f26e64', '#69be5d', '#ec6e08'];
        setStatusBarColor(colors[this.state.index]);
    }

    render() {
        return (<Page className={styles.page}>
            <Carousel
                ref={(carousel) => { this.carousel = carousel; }}
                direction="horizontal"
                fullscreen
                index={this.state.index}
                autoScroll
                autoScrollRatio={0.2}
                >

                <Welcome next={this.handleNext} />
                <FirstQuestion next={this.handleNext} />
                <SecondQuestion next={this.handleNext} />
                <ThirdQuestion next={this.handleNext} />
                <Login />
            </Carousel>
            <CarouselProgress color="#fff" length={5} index={this.state.index} />
        </Page>);
    }
}

export default Introduction;
