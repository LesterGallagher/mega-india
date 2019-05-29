
                import React from 'react';
import ReactDOM from 'react-dom';
import PublicChatSubjectOverview from './PublicChatSubjectOverview';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PublicChatSubjectOverview />, div);
  ReactDOM.unmountComponentAtNode(div);
});
