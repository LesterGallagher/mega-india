
                import React from 'react';
import ReactDOM from 'react-dom';
import AccountEdit from './AccountEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccountEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
