'use strict';

import { shallow } from 'enzyme'
import Page from '../'

describe('Demo Page', function() {
  it('should render Page', function() {
    var page = shallow(Page)
    page.should.exist;
  });
});

