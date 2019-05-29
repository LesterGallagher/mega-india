
                import React from 'react';
import ReactDOM from 'react-dom';
import FAQQuestionPage from './FAQQuestionPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FAQQuestionPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
