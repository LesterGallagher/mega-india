import React, { Component } from 'react';
import styles from './UserProvider.module.css';
import { withFirebase } from '../Firebase/context';

const UserContext = React.createContext(null);

export const Consumer = UserContext.Consumer;

export const withUserData = Component => props => {
    return <Consumer>
        {providerProps => <Component {...props} {...providerProps} />}
    </Consumer>
}

class UserProvider extends Component {
    constructor(props) {
        super();

        this.state = { userData: null };
        const { uid, firebase, prefix } = props;
        this.ref = firebase.database().ref(`/users/${uid}${prefix}`);
    }

    componentWillMount() {
        this.ref.on('value', this.handleValue);
    }

    componentWillUnmount() {
        this.ref.off('value', this.handleValue);
    }

    handleValue = snapshot => {
        this.setState({ userData: snapshot.val() || {} });
    }

    render() {
        const { uid, firebase, prefix } = this.props;
        const { userData } = this.state;
        return (
            <UserContext.Provider value={{ userData, uid, firebase }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default withFirebase(UserProvider);
