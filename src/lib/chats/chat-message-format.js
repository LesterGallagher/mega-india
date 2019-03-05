import React from 'react';
import { Link } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
import { getDisplayName } from '../user';

const reg = /[^}]+}/;
const routeOrderLink = 'routeOrderLink';

export const tranformChatMessageFormat = (msg, displayName) => {
    const name = msg.isSelf ? getDisplayName() : displayName;
    const content = msg.content;
    return content.split('${').map(part => {
        const match = part.match(reg);
        if (match) {
            const input = match[0].slice(0, -1);
            
            if (input === 'displayName') {
                return name + part.replace(reg, '');
            } else if (input.slice(0, routeOrderLink.length) === routeOrderLink) {
                const payload = input.split(':')[1];
                return <Link to={`/route/${payload}`}>Bekijk bod</Link>
            } else {
                return '${' + part;
            }
        }
    })
};

