
                import React from 'react';
import ReactDOM from 'react-dom';
import AspectRatio from './AspectRatio';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AspectRatio />, div);
  ReactDOM.unmountComponentAtNode(div);
});
