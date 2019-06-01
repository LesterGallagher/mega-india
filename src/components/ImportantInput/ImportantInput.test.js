
                import React from 'react';
import ReactDOM from 'react-dom';
import ImportantInput from './ImportantInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImportantInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});
