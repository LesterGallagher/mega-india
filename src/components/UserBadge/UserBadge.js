import React, { Component } from 'react';
import styles from './UserBadge.module.css';
import propTypes from 'prop-types';
import get from 'lodash/get';
import { Row, Col } from 'react-onsenui';
import { getProfileImage, getLoadingIcon } from '../../lib/user';
import { withUserPublicData } from '../UserPublicDataProvider/UserPublicDataProvider';
import TextLoader from '../TextLoader/TextLoader';
import { withRouter } from 'react-router-dom';

class UserBadge extends Component {
    constructor(props) {
        super();
        this.state = {
            profileImage: getLoadingIcon(),
        };
    }

    componentWillMount = async () => {
        const profileImage = await getProfileImage(this.props.uid);
        this.setState({ profileImage });
    }

    render() {
        const { profileImage } = this.state;
        return (
            <Row className={styles.UserBadge} onClick={() => this.props.history.push(`/profile/${this.props.uid}`)}>
                <Col className={styles.userBadgeImageCol}>
                    <img className="list-item__thumbnail list-item--material__thumbnail" src={profileImage} alt="Profile Avatar" />
                </Col>
                <Col>
                    <b><TextLoader width={200} loading={!this.props.userPublicData}>{get(this.props.userPublicData, 'displayName', 'Anoniem')}</TextLoader></b><br />
                    <TextLoader width={150} loading={!this.props.userPublicData}>🚚{get(this.props.userPublicData, 'fName', 'Geen voornaam...')}</TextLoader>
                </Col>
            </Row>
        );
    }
}

UserBadge.propTypes = {
    userPublicData: propTypes.object.isRequired,
    uid: propTypes.string.isRequired,
    clickable: propTypes.bool
}

export default withRouter(UserBadge);
