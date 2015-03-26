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
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(
            <DatePickerPeriod onClick={ listener } value={ 2 } />
          );

      var period = element.getDOMNode();
      TestUtils.Simulate.click(period);

      expect(listener.mock.calls[0][0]).toBe(2);
    });
  });
});
