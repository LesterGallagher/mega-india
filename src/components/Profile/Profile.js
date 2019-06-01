import React, { Component } from 'react';
import ons, { Page, AlertDialog, Button, Toolbar, ToolbarButton, Icon, Fab, Card, ProgressBar, Input } from 'react-onsenui';
import Loader from '../../components/Loader/Loader';
import styles from './Profile.module.css';
import config from '../../config';
import AuthStore from '../../stores/AuthStore';
import { brightness } from '../../helpers/color.js';
import { format } from 'timeago.js';
import { rndId } from '../../helpers/random';
import loaderSvg from './avatar-loader.svg'
import { getBase64, generateThumbnail, getBuffer } from '../../lib/files';
import { uploadProfilePicture, getDisplayName } from '../../lib/user';
import firebase from '../../lib/firebase';
import firebase from '../../lib/firebase';

class Profile extends Component {

    constructor(props) {
        super();
        this.state = {
            photoURL: AuthStore.photoURL,
            progress: null,
            userData: null,
            editDisplayNameDialogOpen: false,
            newUsername: ''
        };
    }

    componentDidMount() {
        AuthStore.userDataObserver.on('value', snapshot => {
            this.setState({
                userData: snapshot.val()
            });
        });
    }

    renderToolbar = () => {
        const displayName = getDisplayName(this.state.userData);
        return (<Toolbar>
            <div className="left">
                <ToolbarButton onClick={window.toggleOnsMenu}>
                    <Icon icon="md-menu" />
                </ToolbarButton>
            </div>
            <div className="center">
                {displayName}
            </div>
            <div className="right">
            </div>
        </Toolbar>);
    }

    handleUploadProgress = (progress, bytesTransferred, totalBytes) => {
        if (this.state.progress === null) return;
        this.setState({
            progress
        });
    }

    handleEditDisplayNameDialogCancel = () => {
        this.setState({ editDisplayNameDialogOpen: false });
    }

    handleProfilePic = async e => {
        const file = e.target.files[0];
        if (!file) return;
        this.setState({
            photoURL: loaderSvg,
            progress: 0
        });
        const buffer = await getBuffer(file);
        const thumbnail = await generateThumbnail(buffer);
        const thumbnailBuffer = await thumbnail.getBufferAsync('image/jpeg');
        const photoURL = await uploadProfilePicture(
            AuthStore.user.uid,
            thumbnailBuffer,
            this.handleUploadProgress
        );
        this.setState({
            photoURL: photoURL,
            progress: null
        });
    }

    handleNewUsername = e => {
        this.setState({
            newUsername: e.target.value
        });
    }

    handleNewUsernameSubmit = async () => {
        if (this.state.newUsername.length > 20) return alert('Uw gebruikersnaam kan niet langer zijn de 20 tekens.');
        if (this.state.newUsername.length < 4) return alert('Uw gebruikersnaam moet meer dan 3 tekens hebben.');
        this.setState({ editDisplayNameDialogOpen: false });
        const uid = AuthStore.user.uid;
        const userRef = firebase.database().ref(`/users/${uid}`);
        const displayNameRef = userRef.child('/displayName');
        displayNameRef.set(this.state.newUsername);
        this.setState({ newUsername: '' });
    }

    render() {
        const randomId = rndId();
        const visibility = this.state.progress === null ? 'hidden' : 'visible';
        const displayName = getDisplayName(this.state.userData);
        return (<Page renderToolbar={this.renderToolbar}>
            <div className={styles.root}>
                <ProgressBar style={{ visibility, position: 'absolute' }} value={this.state.progress} />
                <div className={styles.banner} style={{ backgroundColor: config.primaryColor + 'dd' }}>
                    <div className={styles.avatarOverlay}>
                        <img
                            className={styles.avatar}
                            styles={{ opacity: this.state.progress === null ? 0 : 1 }}
                            src={this.state.photoURL}
                            alt="Profile avatar" />
                        <label>
                            <Fab position="top right">
                                <Icon icon="md-edit" />
                            </Fab>
                            <input accept="image/x-png,image/gif,image/jpeg"
                                onChange={this.handleProfilePic}
                                style={{ display: 'none' }}
                                id={randomId} type="file" />
                        </label>
                    </div>
                    <h5 className={styles.displayName}>
                        {displayName}&nbsp;&nbsp;
                        <Fab modifier="mini" onClick={() => this.setState({ editDisplayNameDialogOpen: true })}>
                            <Icon icon="md-edit" />
                        </Fab>
                    </h5>
                </div>
                <div className={styles.cardWrapper}>
                    <Card>
                        <div className={styles.cardInner}>
                            <div className={styles.profileStat}>
                                Berichten<br />

                            </div>
                            <div className={styles.profileStat}>
                                Chats<br />

                            </div>
                            <div className={styles.profileStat}>
                                Geregistreerd<br />
                                {format(AuthStore.user.metadata.creationTime, 'nl')}
                            </div>
                        </div>
                    </Card>
                </div>
                <AlertDialog modifier="rowfooter"
                    className={styles.editDisplayNameDialog}
                    isOpen={this.state.editDisplayNameDialogOpen}
                    onCancel={this.handleEditDisplayNameDialogCancel}
                    cancelable>

                    <div className="alert-dialog-title">Gebruikersnaam</div>
                    <div className="alert-dialog-content">
                        <Input type="text"
                            className={styles.displayNameEditInput}
                            placeholder="Nieuwe gebruikersnaam"
                            float
                            max={20}
                            min={3}
                            modifier="material"
                            onChange={this.handleNewUsername}
                            value={this.state.newUsername} />
                    </div>
                    <div className="alert-dialog-footer">
                        <Button
                            style={{ width: '50%' }}
                            onClick={this.handleEditDisplayNameDialogCancel}
                            className="alert-dialog-button">
                            Annuleren
                        </Button>
                        <Button
                            style={{ width: '50%' }}
                            onClick={this.handleNewUsernameSubmit}
                            className="alert-dialog-button">
                            Ok
                        </Button>
                    </div>
                </AlertDialog>
            </div>
        </Page>);
    }
}

export default Profile;
