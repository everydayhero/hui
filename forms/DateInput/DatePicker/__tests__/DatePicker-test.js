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
  var findByTag   = TestUtils.findRenderedDOMComponentWithTag;
  var scryByTag   = TestUtils.scryRenderedDOMComponentsWithTag;
  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  var date, component, passedDate;

  beforeEach(function() {
    date = moment();
    passedDate = null;
    var onChangeSelection = function(value) { passedDate = value; }
    component = TestUtils.renderIntoDocument(<DatePicker date={ date } onChangeSelection={ onChangeSelection }/>);
  });

  it('should set the month state', function() {
    var month = 1;
    component.setMonth(month);
    expect(passedDate.month()).toEqual(month);
  });

  it('should set the year state', function() {
    var year = 2015;
    component.setYear(year);
    expect(passedDate.year()).toEqual(year);
  });
});
