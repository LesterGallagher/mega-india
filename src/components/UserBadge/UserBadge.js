import React, { Component } from 'react';
import styles from './UserBadge.module.css';
import propTypes from 'prop-types';
import get from 'lodash/get';
import { Row, Col } from 'react-onsenui';
import { withFirebase } from '../Firebase/context';
import { getProfileImage, getLoadingIcon } from '../../lib/user';

class UserBadge extends Component {
    constructor(props) {
        super();
        this.state = {
            profileImage: getLoadingIcon(),
            publicData: {}
        };

        this.publicUserRef = props.firebase.database().ref(`/users/${props.uid}/public`);
    }

    componentWillMount = async () => {
        const profileImage = await getProfileImage(this.props.uid);
        this.setState({ profileImage });

        setTimeout(() => {
            this.publicUserRef.on('value', this.setPublicData);
        }, 0);
    }

    setPublicData = snapshot => {
        this.setState({ publicData: snapshot.val() });
    }

    componentWillUnmount() {
        this.publicUserRef.off('value', this.setPublicData);
    }

    render() {
        const { profileImage } = this.state;
        return (
            <Row className={styles.UserBadge}>
                <Col className={styles.userBadgeImageCol}>
                    <img className="list-item__thumbnail list-item--material__thumbnail" src={profileImage} alt="Profile Avatar" />
                </Col>
                <Col>
                    <b>{get(this.state.publicData, 'displayName', 'loading...')}</b><br />
                    🚚{get(this.state.publicData, 'fName', 'loading...')}
                </Col>
            </Row>
        );
    }
}

UserBadge.propTypes = {
    uid: propTypes.string.isRequired
}

export default withFirebase(UserBadge);
