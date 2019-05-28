
                import React from 'react';
import ReactDOM from 'react-dom';
import DateInputs from './DateInputs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DateInputs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
