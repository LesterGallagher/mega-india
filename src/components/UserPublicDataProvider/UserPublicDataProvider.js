import React, { Component } from 'react';
import styles from './UserPublicDataProvider.module.css';
import { withFirebase } from '../Firebase/index';
import UserProvider, { Consumer } from '../UserProvider/UserProvider';

export const withUserPublicData = Component => props => {
    return <Consumer>
        {({ uid, userData, firebase }) => <Component {...props} userPublicData={userData} uid={uid} firebase={firebase} />}
    </Consumer>
}

export default props => {
    return (
        <UserProvider {...props} prefix="/public">
            {props.children}
        </UserProvider>
    )
};