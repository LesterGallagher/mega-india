import React, { Component } from 'react';
import styles from './GestureDetector.module.css';
import * as ons from 'onsenui';
import {} from 'react-onsenui';
import propTypes from 'prop-types';

const gestureEvents = [
    'onDrag',	
    'onDragstart',	
    'onDragend',	
    'onDrapleft',	
    'onDragright',	
    'onDragup',	
    'onDragdown',	
    'onGesture',	
    'onHold',	
    'onRelease',	
    'onSwipe',	
    'onSwipeleft',	
    'onSwiperight',	
    'onSwipeup',	
    'onSwipedown',	
    'onTap',	
    'onDoubletap',	
    'onTouch',	
    'onTransform',	
    'onTransformstart',	
    'onTransformend',	
    'onPinchin',	
    'onPinchout',	
    'onRotate'
];

class GestureDetector extends Component {
    constructor(props) {
        super();

    }
    
    componentWillMount() {
    }
    
  
    
    componentDidMount() {
        this.gd = new ons.GestureDetector(this.ref);
        const myEvents = gestureEvents.filter(ev => ev in this.props);
        myEvents.forEach(ev => {
            this.gd.on(ev, this.props[ev]);
        });
    }

    componentWillUnmount() {
        this.gd.destroy();
    }

    render() {
        return (
            <div ref={ref => this.ref = ref} className={styles.GestureDetector}>
                {this.props.children}
            </div>
        );
    }
}

GestureDetector.propTypes = {
    ...gestureEvents.map(event => ({ [event]: propTypes.func }))
}

export default GestureDetector;
