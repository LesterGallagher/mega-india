
                import React from 'react';
import ReactDOM from 'react-dom';
import GestureDetector from './GestureDetector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GestureDetector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
