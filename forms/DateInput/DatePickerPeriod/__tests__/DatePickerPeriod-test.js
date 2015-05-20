"use strict";

jest.dontMock('../');
jest.dontMock('lodash');
jest.dontMock('moment');
jest.dontMock('classnames');

describe('DatePickerPeriod', function() {
  var React            = require('react/addons');
  var DatePickerPeriod = require('../');
  var TestUtils        = React.addons.TestUtils;

  describe('selected', function() {
    var element = TestUtils.renderIntoDocument(
          <DatePickerPeriod value={ 2014 } current={ 2014 }/>
        );

    it('renders as selected', function() {
      var className = element.getDOMNode().className;

      expect(className).toContain('hui-DatePickerPeriod--selected');
    });
  });

  describe('onClick', function() {
    it('is fired onClick', function() {
      var parsedValue;
      var value = 2;
      var listener = function(value) { parsedValue = value; };
      var element = TestUtils.renderIntoDocument(
            <DatePickerPeriod onSelect={ listener } value={ value } />
          );

      var period = element.getDOMNode();
      TestUtils.Simulate.click(period);

      expect(parsedValue).toBe(value);
    });
  });
});
