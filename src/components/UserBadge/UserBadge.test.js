
                import React from 'react';
import ReactDOM from 'react-dom';
import UserBadge from './UserBadge';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserBadge />, div);
  ReactDOM.unmountComponentAtNode(div);
});
