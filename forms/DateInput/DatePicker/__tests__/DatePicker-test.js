"use strict";

jest.dontMock('../');
jest.dontMock('lodash');
jest.dontMock('moment');
jest.dontMock('../../DatePickerDay');

describe('DatePicker', function() {
  var React       = require('react/addons');
  var DatePicker  = require('../');
  var moment      = require('moment');
  var TestUtils   = React.addons.TestUtils;

  var date, element;

  beforeEach(function() {
    date = moment();
    element = TestUtils.renderIntoDocument(<DatePicker value={ date } />);
  });

  it('should set the month state', function() {
    expect(element.state.month).toEqual(date.month());
  });

  it('should set the year state', function() {
    expect(element.state.year).toEqual(date.year());
  });
});
