import React, { Component } from 'react';
import { Fab, SpeedDial, SpeedDialItem, Icon, List, ListTitle, ListItem, ListHeader } from 'react-onsenui';
import styles from './UserProfile.module.css';
import panoramic from './panoramic.jpg';
import PageBanner from '../PageBanner/PageBanner';
import colors from '../../style/colors.css';
import { getProfileImage, getLoadingIcon } from '../../lib/user';
import { withFirebase } from '../Firebase/context';
import get from 'lodash/get';
import AuthStore from '../../stores/AuthStore';
import { withRouter } from 'react-router-dom';
import { PERSONAL_PROFILE, ACCOUNT } from '../../constants/routes';

class UserProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            data: null,
            profileImage: getLoadingIcon()
        };

        const { uid, firebase } = props;

        this.publicDataRef = firebase.database().ref(`/users/${uid}/public`);
    }

    componentWillMount() {
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.publicDataRef.on('value', this.handleData);
        }, 0);

        const { uid } = this.props;
        const profileImage = await getProfileImage(uid)
        this.setState({ profileImage });
    }

    handleData = snapshot => {
        this.setState({ data: snapshot.val() })
    }

    componentWillUnmount() {
    }
    
    openUrl = url => () => {
        this.props.history.push(url);
    }

    renderFab = () => {
        const { uid } = this.props;
        const myUid = get(AuthStore, 'user.uid');

        return (
            <SpeedDial disabled={false} direction='up' onClick={() => console.log('test1')} style={{ position: 'absolute', right: 20, bottom: -25 }}>
                <Fab style={{ backgroundColor: colors.primary }}>
                    <Icon icon='md-more-vert' size={26} fixedWidth={false} style={{ verticalAlign: 'middle' }} />
                </Fab>
                { uid === myUid
                    ? <SpeedDialItem onClick={this.openUrl(ACCOUNT)}> <Icon icon="md-edit" />  </SpeedDialItem>
                    : null }
                <SpeedDialItem onClick={() => console.log('speed A')}> <Icon icon="md-share" /> </SpeedDialItem>
                <SpeedDialItem onClick={() => console.log('speed C')}> <Icon icon="md-twitter" /> </SpeedDialItem>
                <SpeedDialItem onClick={() => console.log('speed D')}> <Icon icon="md-youtube" />  </SpeedDialItem>
            </SpeedDial>
        );
    }

    render() {
        const { uid } = this.props;
        const { profileImage, data } = this.state;

        return (
            <div className={styles.UserProfile}>

                {/* {this.props.uid} */}

                <PageBanner
                    colors={colors}
                    image={panoramic}
                    avatar={profileImage}
                    title={get(data, 'displayName', '')}
                    height={300}
                    renderFab={this.renderFab} />

                {/* <div style={{ padding: 20, }}>
                    <h1>{get(data, 'fName', '')}</h1>
                </div> */}

                <List>
                    <ListTitle>{get(data, 'fName', '')}</ListTitle>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">Omschrijving</span>
                            <span className="list-item__subtitle">{get(data, 'description', '')}</span>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className="center">
                            <span className="list-item__title">Ervaring</span>
                            <span className="list-item__subtitle">{get(data, 'experience', '')}</span>
                        </div>
                    </ListItem>
                </List>

            </div>
        );
    }
}

export default withRouter(withFirebase(UserProfile));
