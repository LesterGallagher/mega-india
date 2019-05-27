import React, { Component } from 'react';
import styles from './ESStudioFeed.module.css';
import { connect } from 'react-redux';
import { fetchFeed } from '../../actions/feeds-actions';
import { withFirebase, withFirestore } from 'react-redux-firebase';

const mapStoreToProps = connect(store => {
    return { feeds: store.feeds };
});

class ESStudioFeed extends Component {
    constructor(props) {
        super();
        this.state = {
        };
        console.log('esstudio feed')
    }

    componentWillMount() {
        this.props.dispatch(fetchFeed('https://esstudio.site/feed'));
    }

    componentWillUnmount() {
    }

    render() {
        console.log('essstudio props', this.props, this.props.firebase.push);
        return (
            <div className="ESStudioFeed">
            </div>
        );
    }
}

export default withFirestore(withFirebase(mapStoreToProps(ESStudioFeed)));
