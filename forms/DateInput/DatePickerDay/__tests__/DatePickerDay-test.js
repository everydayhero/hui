"use strict";

jest.dontMock('../');
jest.dontMock('lodash');
jest.dontMock('moment');

describe('DatePickerDay', function() {
  var React         = require('react/addons');
  var DatePickerDay = require('../');
  var moment        = require('moment');
  var TestUtils     = React.addons.TestUtils;

  describe('selected', function() {
    var date = moment("2014-10-20 4:30 +0000", "YYYY-MM-DD HH:mm Z");
    var element = TestUtils.renderIntoDocument(
          <DatePickerDay date={ date } selectedDate={ date }/>
        );

    it('renders day as selected', function() {
      var className = element.getDOMNode().className;

      expect(className).toContain('hui-DatePickerDay--selected');
    });
  });

 describe('today', function() {
    var date = moment();
    var element = TestUtils.renderIntoDocument(
          <DatePickerDay date={ date } selectedDate={ date } />
        );

    it('renders day as selected', function() {
      var className = element.getDOMNode().className;

      expect(className).toContain('hui-DatePickerDay--today');
    });
  });

  describe('onClick', function() {
    it('is fired onClick', function() {
      var date = moment("2014-10-20 4:30 +0000", "YYYY-MM-DD HH:mm Z");
      var listener = jest.genMockFunction();
      var element = TestUtils.renderIntoDocument(
            <DatePickerDay onClick={ listener } date={ date }/>
          );

      date = element.getDOMNode();
      TestUtils.Simulate.click(date);

      expect(listener.mock.calls.length).toBe(1);
    });
  });
});
