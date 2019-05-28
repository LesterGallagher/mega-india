
                import React from 'react';
import ReactDOM from 'react-dom';
import PersonalProfilePage from './PersonalProfilePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PersonalProfilePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
