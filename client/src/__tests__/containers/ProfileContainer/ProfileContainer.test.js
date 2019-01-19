import React from 'react';
import { shallow } from 'enzyme';
import ProfileContainer from '../../../containers/ProfileContainer';

describe('<ProfileContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<ProfileContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
