
                import React from 'react';
import ReactDOM from 'react-dom';
import ChoosePackageReceiver from './ChoosePackageReceiver';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChoosePackageReceiver />, div);
  ReactDOM.unmountComponentAtNode(div);
});
