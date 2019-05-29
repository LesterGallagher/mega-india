
                import React from 'react';
import ReactDOM from 'react-dom';
import FAQPage from './FAQPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FAQPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
