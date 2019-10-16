import React from 'react';
import { shallow , mount} from 'enzyme';
import HeadColumn from './HeadColumn';

describe('HeadColumn component', () => {
  it('should render', () => {
    shallow(
      <HeadColumn>Test</HeadColumn>
    );
  });

  it('on click should show icon with asc or desc ordering', () => {
    const wrapper = mount(<HeadColumn>Test</HeadColumn>);
    wrapper.simulate('click');
    expect(wrapper.find('.HeadColumn--asc').length).toEqual(1);
    wrapper.simulate('click');
    expect(wrapper.find('.HeadColumn--asc').length).toEqual(0);
    expect(wrapper.find('.HeadColumn--desc').length).toEqual(1);
    wrapper.simulate('click');
    expect(wrapper.find('.HeadColumn--asc').length).toEqual(1);
    expect(wrapper.find('.HeadColumn--desc').length).toEqual(0);
  });
});  
