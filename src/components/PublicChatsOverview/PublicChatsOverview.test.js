
                import React from 'react';
import ReactDOM from 'react-dom';
import PublicChatsOverview from './PublicChatsOverview';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PublicChatsOverview />, div);
  ReactDOM.unmountComponentAtNode(div);
});
