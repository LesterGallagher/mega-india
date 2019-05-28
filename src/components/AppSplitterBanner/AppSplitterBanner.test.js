
                import React from 'react';
import ReactDOM from 'react-dom';
import AppSplitterBanner from './AppSplitterBanner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppSplitterBanner />, div);
  ReactDOM.unmountComponentAtNode(div);
});
