import React from 'react';
import { shallow } from 'enzyme';
import HeadColumn from './HeadColumn';

describe('HeadColumn component', () => {
  it('should render', () => {
    shallow(
      <HeadColumn>Test</HeadColumn>
    );
  });
});  
