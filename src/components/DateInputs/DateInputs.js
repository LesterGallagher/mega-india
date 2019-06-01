import React, { Component } from 'react';
import styles from './DateInputs.module.css';
import { Input } from 'react-onsenui';
import get from 'lodash/get';
import propTypes from 'prop-types';
import classNames from 'classnames';

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

class DateInputs extends Component {
    constructor(props) {
        super();
        const date = props.value;
        this.state = {
            value: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            },
            warning: {
                day: false,
                month: false,
                year: false,
            }
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    change = key => e => {
        const newDate = Object.assign({}, this.state.value, { [key]: e.target.value.trim() });
        const warning = { day: false, month: false, year: false };
        if (newDate.month && newDate.month !== '0') {
            newDate.month = Math.min(12, Math.max(1, +newDate.month));
        } else {
            warning.month = true;
        }
        if (newDate.year && newDate.year > 1860) {
            newDate.year = Math.min(new Date().getFullYear(), newDate.year);
        } else {
            warning.year = true
        }
        if (newDate.day) {
            newDate.day = Math.min(daysInMonth(newDate.month, newDate.year), Math.max(1, newDate.day));
        } else {
            warning.day = true;
        }
        this.setState({ value: newDate, warning });
        this.props.onChange(new Date(newDate.year, newDate.month -1, newDate.day));
    }

    render() {
        const day = get(this, 'state.value.day', 1);
        const month = get(this, 'state.value.month', 1);
        const year = get(this, 'state.value.year', 1860);

        return (
            <div className={styles.DateInputs}>
                <Input
                    className={classNames({ [styles.warning]: this.state.warning.day })}
                    onChange={this.change('day')}
                    type="number"
                    name="day"
                    value={'' + day} />
                <Input
                    className={classNames({ [styles.warning]: this.state.warning.month })}
                    onChange={this.change('month')} 
                    type="number" 
                    name="month" 
                    value={'' + month} />
                <Input
                    className={classNames({ [styles.warning]: this.state.warning.year })}
                    onChange={this.change('year')} 
                    type="number" 
                    name="year" 
                    value={'' + year} />
            </div>
        );
    }
}

DateInputs.propTypes = {
    onChange: propTypes.func.isRequired,
    value: propTypes.object.isRequired
};

export default DateInputs;
