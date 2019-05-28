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
            data: {},
            profileImageProgress: null,
            profileImage: getLoadingIcon(),
            loading: true
        };

        this.publicUserRef = props.firebase.database().ref(`/users/${AuthStore.user.uid}/public`);
        props.onLoadingProgress({ indeterminate: true });
    }

    handlePublicUserRefChange = snapshot => {
        this.setState({ data: snapshot.val() });
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
        }, 0);
        const profileImage = await getProfileImage(AuthStore.user.uid);
        this.setState({ profileImage, loading: false });
        this.props.onLoadingProgress({ });
    }

    componentWillUnmount() {

    }

    changeInfo = (key, value) => {
        this.props.onLoadingProgress({ indeterminate: true });
        this.setState(prevState => {
            const { data } = prevState;
            Object.assign(data, { [key]: value });
            return prevState;
        });
        this.props.onLoadingProgress({ });
    }

    updateFirebase = async () => {
        this.setState({  })
        await this.publicUserRef.set(this.state.data);
        ons.notification.toast('Account informatie is verwerkt.', { timeout: 4000 });
    };

    render() {
        const { data, loading } = this.state;
        console.log(data);
        console.log(get(data, 'fName', ''));

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
                                <Select onChange={e => this.changeInfo('gender', e.target.value)} value={get(data, 'gender')}>
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
                                    onChange={e => this.changeInfo('fName', e.target.value)}
                                    value={get(data, 'fName', '')} />
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
                                    onChange={e => this.changeInfo('lName', e.target.value)}
                                    value={get(data, 'lName', '')} />
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
                                    onChange={date => this.changeInfo('birthDate', date)}
                                    value={get(this, 'state.data.birthDate', new Date('2000'))}
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
                                    onChange={e => this.changeInfo('postalCode', e.target.value)}
                                    value={get(data, 'postalCode', '')} />
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
                                    onChange={e => this.changeInfo('tel', e.target.value)}
                                    value={get(data, 'tel', '')}
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
                                    onChange={e => this.changeInfo('description', e.target.value)}
                                    value={get(data, 'description', '')}
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
                                    onChange={e => this.changeInfo('experience', e.target.value)}
                                    value={get(data, 'experience', '')}
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
                                    onChange={e => this.changeInfo('vog', e.target.checked)}
                                    checked={get(data, 'vog', false)} />
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
