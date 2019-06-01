import React, { Component } from 'react';
import styles from './ChoosePackageReceiver.module.css';
import UserSearch from '../UserSearch/UserSearch';
import { Card } from 'react-onsenui';

class ChoosePackageReceiver extends Component {
  constructor(props) {
    super();
    this.state = {
    };

  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={styles.ChoosePackageReceiver}>
        <h5 style={{ margin: 10 }}>Kies ontvanger <small>(optioneel)</small></h5>

        <Card>
          <UserSearch onSelect={this.props.onSelect} />
        </Card>
      </div>
    );
  }
}


export default ChoosePackageReceiver;

