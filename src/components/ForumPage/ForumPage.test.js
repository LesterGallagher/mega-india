
                import React from 'react';
import ReactDOM from 'react-dom';
import ForumPage from './ForumPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForumPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
