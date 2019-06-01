
                import React from 'react';
import ReactDOM from 'react-dom';
import MyDeliveriesListSearch from './MyDeliveriesListSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyDeliveriesListSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
