import React from 'react';
import { Link } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
import { getDisplayName } from '../user';

const reg = /[^}]+}/;
const routeOrderLink = 'routeOrderLink';

export const tranformChatMessageFormat = (msg, displayName) => {
    const name = msg.isSelf ? getDisplayName() : displayName;
    const content = msg.content;
    let i = 0;
    return content.split('${').map((part, i) => {
        if (i === 0) return <span key={i++}>{part}</span>;
        const match = part.match(reg);
        if (match) {
            const input = match[0].slice(0, -1);
            if (input === 'displayName') {
                return <span key={i++}>{name + part.replace(reg, '')}</span>;
            } else if (input.slice(0, routeOrderLink.length) === routeOrderLink) {
                const payload = input.split(':')[1];
                return <Link key={i++} to={`/route/${payload}`}>Bekijk bod</Link>
            }
        }
        return <span key={i++}>{'${' + part}</span>
    });
};

