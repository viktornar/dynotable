import React from 'react';
import { mount, shallow } from 'enzyme';
import Settings from './Settings';

describe('Settings component', () => {
  it('should render', () => {
    shallow(
      <Settings onSettingsChange={() => {}} />
    );
  });

  it('should change isPagination setting', () => {
    const wrapped = mount(
      <Settings onSettingsChange={() => {}}/>
    )
    wrapped.find('button').simulate('click');
    expect(wrapped.find('button').text()).toBe("Switch to full view");
    wrapped.find('button').simulate('click');
    expect(wrapped.find('button').text()).toBe("Switch to pages");
  });
});  
