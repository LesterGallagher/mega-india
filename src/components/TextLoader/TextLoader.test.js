
                import React from 'react';
import ReactDOM from 'react-dom';
import TextLoader from './TextLoader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextLoader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
