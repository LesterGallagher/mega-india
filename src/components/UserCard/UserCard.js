import React, { Component } from 'react';
import styles from './UserCard.module.css';
import { Page, Toolbar, Button, ToolbarButton, Icon, Card, Row, Col } from 'react-onsenui';
import firebase from '../../lib/firebase';
import { getProfileImage } from '../../lib/user';

const greyImgURI = 'data:image/png;base64,iVBORw0KGgoAAAAN'
    + 'SUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEWZmZl86KQWAAA'
    + 'ADklEQVQY02NgGAWDCQAAAZAAAcWb20kAAAAASUVORK5CYII=';

class UserCard extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    componentDidMount = async () => {
        this.ref = firebase.database().ref(`/users/${this.props.uid}/public`);
        this.ref.on('value', this.handleUserPublicData);
        this.setState({
            profileImage: await getProfileImage(this.props.uid)
        });
    }

    handleUserPublicData = snapshot => {
        this.setState({ userPublicData: snapshot.val() })
    }

    componentWillUnmount() {
        this.ref.off('value', this.handleUserPublicData);
    }

    render() {
        const userPublicData = this.state.userPublicData || {};
        const src = this.state.profileImage || greyImgURI;
        const alt = (userPublicData.displayName || 'User') + ' avatar';

        return (
            <div className="UserCard">
                <Card>
                    <Row>
                        <Col>
                            <img width="50" height="50"
                                className="list-item__thumbnail"
                                alt={alt}
                                src={src} />
                        </Col>
                        <Col>
                            <div className={styles.greyDisplayName}>
                                {userPublicData.displayName || 'Anonymous'}
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default UserCard;
