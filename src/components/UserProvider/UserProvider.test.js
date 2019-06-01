
                import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from './UserProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});
