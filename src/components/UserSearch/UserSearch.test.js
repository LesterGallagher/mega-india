
                import React from 'react';
import ReactDOM from 'react-dom';
import UserSearch from './UserSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
