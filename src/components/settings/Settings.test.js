import React from 'react';
import { shallow, mount} from 'enzyme';
import Settings from './Settings';

describe('Settings component', () => {
  it('should render', () => {
    shallow(
      <Settings />
    );
  });
});  
