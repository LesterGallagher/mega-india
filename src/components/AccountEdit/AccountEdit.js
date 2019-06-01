import React, { Component } from 'react';
import styles from './AccountEdit.module.css';
import { withFirebase } from '../Firebase/context';
import AuthStore from '../../stores/AuthStore';
import get from 'lodash/get';
import { List, ListItem, ListTitle, ListHeader, Select, Input, Button, Checkbox, Switch } from 'react-onsenui';
import ExternalLink from '../ExternalLink/ExternalLink';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateInputs from '../DateInputs/DateInputs';
import { debounce } from '../../lib/util';
import * as ons from 'onsenui';
import { getProfileImage, uploadProfilePicture, getDefaultAvatar, getLoadingIcon } from '../../lib/user';
import propTypes from 'prop-types';
import classNames from 'classnames';

class AccountEdit extends Component {
    constructor(props) {
        super();
        this.state = {
            profileImageProgress: null,
            profileImage: getLoadingIcon(),
            loading: true
        };

        this.publicUserRef = props.firebase.database().ref(`/users/${AuthStore.user.uid}/public`);
        this.privateUserRef = props.firebase.database().ref(`/users/${AuthStore.user.uid}/private`);
        props.onLoadingProgress({ indeterminate: true });
    }

    handlePublicUserRefChange = snapshot => {
        this.setState({ publicData: snapshot.val() || {} });
    }

    handlePrivateUserRefChange = snapshot => {
        this.setState({ privateData: snapshot.val() || {} })
    }

    handleProfilePictureChange = async e => {
        try {
            const file = e.target.files[0];
            if (!file) return;
            const profileImage = await uploadProfilePicture(AuthStore.user.uid, file, profileImageProgress => {
                this.props.onLoadingProgress({ value: profileImageProgress });
            });
            this.setState({ profileImage });
        } catch (err) {
            ons.notification.alert('Er ging iets verkeerd met uploaden. Probeer een ander bestand of probeer het later nog een keer.')
        }
        this.props.onLoadingProgress({ });
    }

    componentWillMount() {
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.publicUserRef.on('value', this.handlePublicUserRefChange);
            this.privateUserRef.on('value', this.handlePrivateUserRefChange);
        }, 0);
        const profileImage = await getProfileImage(AuthStore.user.uid);
        this.setState({ profileImage, loading: false });
        this.props.onLoadingProgress({ });
    }

    componentWillUnmount() {

    }

    changeInfo = (isPublic, key, value) => {
        this.props.onLoadingProgress({ indeterminate: true });
        this.setState(prevState => {
            const { publicData, privateData } = prevState;
            Object.assign(isPublic ? publicData : privateData, { [key]: value });
            return prevState;
        });
        this.props.onLoadingProgress({ });
    }

    updateFirebase = async () => {
        await this.publicUserRef.set(this.state.publicData);
        await this.privateUserRef.set(this.state.privateData);
        ons.notification.toast('Account informatie is verwerkt.', { timeout: 4000 });
    };

    render() {
        const { publicData, privateData, loading } = this.state;

        if (publicData === undefined || privateData === undefined) return null;

        return (
            <div className={styles.AccountEdit}>
                <form>
                    <List className={classNames({ [styles.list]: true, [styles.loading]: loading })}>
                        <ListTitle>Account</ListTitle>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Aanhef
                                </span>
                                <span className="list-item__subtitle">Openbaar</span>
                            </div>
                            <div className="right">
                                <Select onChange={e => this.changeInfo(false, 'gender', e.target.value)} value={get(privateData, 'gender')}>
                                    <option value="m">Man</option>
                                    <option value="f">Vrouw</option>
                                </Select>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Voornaam
                            </span>
                                <span className="list-item__subtitle">Openbaar</span>
                            </div>
                            <div className="right">
                                <Input type="text"
                                    minLength="2"
                                    onChange={e => this.changeInfo(true, 'fName', e.target.value)}
                                    value={get(publicData, 'fName', '')} />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Achternaam
                            </span>
                                <span className="list-item__subtitle">Beschermd</span>
                            </div>
                            <div className="right">
                                <Input type="text"
                                    minLength="1"
                                    onChange={e => this.changeInfo(false, 'lName', e.target.value)}
                                    value={get(privateData, 'lName', '')} />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Geboortedatum
                            </span>
                                <span className="list-item__subtitle">Beschermd</span>
                            </div>
                            <div className="right">
                                <DateInputs
                                    onChange={date => this.changeInfo(false, 'birthDate', date.getTime())}
                                    value={new Date(get(privateData, 'birthDate', null))}
                                />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Postcode
                                </span>
                                <span className="list-item__subtitle">Beschermd</span>
                            </div>
                            <div className="right">
                                <Input type="text"
                                    onChange={e => this.changeInfo(false, 'postalCode', e.target.value)}
                                    value={get(privateData, 'postalCode', '')} />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Telefoonnummer
                                </span>
                                <span className="list-item__subtitle">Beschermd</span>
                            </div>
                            <div className="right">
                                <Input
                                    onChange={e => this.changeInfo(false, 'tel', e.target.value)}
                                    value={get(privateData, 'tel', '')}
                                    type="text" />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="left">
                                <img className="list-item__thumbnail" alt="Profiel avatar" src={this.state.profileImage} />
                            </div>
                            <div className="center">
                                <span className="list-item__title">
                                    Profielfoto
                                </span>
                                <span className="list-item__subtitle">Openbaar</span>
                            </div>
                            <div className="right">
                                <label htmlFor="profile-pic">
                                    <Button modifier="outline">
                                        Uploaden
                                    </Button>
                                </label>
                                <Input onChange={this.handleProfilePictureChange} inputId="profile-pic" style={{ display: 'none' }} type="file" accept="image/*" />
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Vertel iets over jezelf
                            </span>
                                <span className="list-item__subtitle">Openbaar</span>
                            </div>
                            <div className="right">
                                <textarea
                                    onChange={e => this.changeInfo(true, 'description', e.target.value)}
                                    value={get(publicData, 'description', '')}
                                    className="textarea textarea--transparent"
                                    rows="8"
                                    placeholder="Gebruik dit veld om iets te vertellen over jezelf. Noem bijvoorbeeld je hobby's en waarom je gebruik maakt van deze website. Let op: bescherm je eigen privacy. Vermeld geen achternaam of contactgegevens."></textarea>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Ervaring
                            </span>
                                <span className="list-item__subtitle">Openbaar</span>
                            </div>
                            <div className="right">
                                <textarea
                                    onChange={e => this.changeInfo(true, 'experience', e.target.value)}
                                    value={get(publicData, 'experience', '')}
                                    className="textarea textarea--transparent"
                                    rows="4"
                                    placeholder="Heb je relevante (werk)ervaring die van belang kan zijn, vermeld deze dan hier."></textarea>
                            </div>

                        </ListItem>
                        <ListItem>
                            <div className="center">
                                <span className="list-item__title">
                                    Ik ben in het bezit van een <ExternalLink href="https://www.justis.nl/producten/vog/">Verklaring Omtrent Gedrag</ExternalLink> en kan deze op verzoek laten zien.
                                </span>
                                <span className="list-item__subtitle">Openbaar</span>
                            </div>
                            <div className="right">
                                <Switch
                                    onChange={e => this.changeInfo(true, 'vog', e.target.checked)}
                                    checked={get(publicData, 'vog', false)} />
                            </div>
                        </ListItem>
                        <ListTitle>Gegevens Opslaan</ListTitle>
                        <ListItem>
                            <Button onClick={this.updateFirebase} modifier="large--cta">
                                Opslaan
                            </Button>
                        </ListItem>
                    </List>
                </form>
            </div>
        );
    }
}

AccountEdit.propTypes = {
    onLoadingProgress: propTypes.func.isRequired
}

export default withFirebase(AccountEdit);
