
                import React from 'react';
import ReactDOM from 'react-dom';
import FindCourierPage from './FindCourierPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FindCourierPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
