
                import React from 'react';
import ReactDOM from 'react-dom';
import MyDeliveriesPage from './MyDeliveriesPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyDeliveriesPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
