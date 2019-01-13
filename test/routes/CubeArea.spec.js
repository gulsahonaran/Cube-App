import React from 'react';

import { CubeArea } from 'routes/CubeArea';

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  location: {},
  user: {},
};

function setup(ownProps = props) {
  return mount(<CubeArea {...ownProps} />);
}

describe('CubeArea', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
