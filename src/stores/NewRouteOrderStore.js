import { EventEmitter } from "events";
import firebase from '../lib/firebase';
import moment from 'moment';

class NewRouteOrderStore extends EventEmitter {
    constructor() {
        super();

        this.state = {
            fromTo: {
                origin: '',
                destination: ''
            },
            receiver: null,
            cost: null,
            date: moment(),
            time: {
                hours: 13,
                minutes: 0
            },
            title: '',
            description: '',
            transportMethods: {
                fiets: false,
                brommer: false,
                auto: false,
                vrachtbus: false,
                anders: false,
                otherText: ''
            }
        };
    }

    setStoreState = state => {
        if (typeof state === 'function') {
            state = state(this.state);
        }
        Object.assign(this.state, state);
        this.emit('change');
    }

    clear = () => {
        this.state = {};
        this.emit('change');
    }
}

export default new NewRouteOrderStore();
