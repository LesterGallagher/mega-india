
                import React from 'react';
import ReactDOM from 'react-dom';
import MyRouteOrdersPage from './MyRouteOrdersPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyRouteOrdersPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
