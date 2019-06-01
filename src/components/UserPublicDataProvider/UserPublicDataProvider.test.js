
                import React from 'react';
import ReactDOM from 'react-dom';
import UserPublicDataProvider from './UserPublicDataProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserPublicDataProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});
