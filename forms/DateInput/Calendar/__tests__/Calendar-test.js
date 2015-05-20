"use strict";

jest.dontMock('../');
jest.dontMock('lodash');
jest.dontMock('moment');
jest.dontMock('classnames');
jest.dontMock('../../DatePickerDay');

describe('Calendar', function() {
  var React       = require('react/addons');
  var Calendar    = require('../');
  var moment      = require('moment');
  var TestUtils   = React.addons.TestUtils;
  var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('Jan 2014', function() {
    var date = moment('2014-01-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 31 days in Jan', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(31);
    });

    it('Jan 2014 starts on a Wednesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(3);
    });
  });

  describe('Feb 2014', function() {
    var date = moment('2014-02-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 28 days in Feb', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(28);
    });

    it('Feb 2014 starts on a Saturday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(6);
    });
  });

  describe('Mar 2014', function() {
    var date = moment('2014-03-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 31 days in Mar', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(31);
    });

    it('Mar 2014 starts on a Saturday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(6);
    });
  });

  describe('Apr 2014', function() {
    var date = moment('2014-04-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 30 days in Apr', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(30);
    });

    it('Apr 2014 starts on a Tuesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(2);
    });
  });

  describe('May 2014', function() {
    var date = moment('2014-05-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 31 days in May', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(31);
    });

    it('May 2014 starts on a Thursday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(4);
    });
  });

  describe('Jun 2014', function() {
    var date = moment('2014-06-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 30 days in Jun', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(30);
    });

    it('Jun 2014 starts on a Sunday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(0);
    });
  });

  describe('Jul 2014', function() {
    var date = moment('2014-07-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 31 days in Jul', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(31);
    });

    it('Jul 2014 starts on a Tuesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(2);
    });
  });

  describe('Aug 2014', function() {
    var date = moment('2014-08-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 31 days in Aug', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(31);
    });

    it('Aug 2014 starts on a Friday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(5);
    });
  });

  describe('Sep 2014', function() {
    var date = moment('2014-09-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 30 days in Sep', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(30);
    });

    it('Sep 2014 starts on a Monday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(1);
    });
  });

  describe('Oct 2014', function() {
    var date = moment('2014-10-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 30 days in Oct', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(31);
    });

    it('Oct 2014 starts on a Wednesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(3);
    });
  });

  describe('Nov 2014', function() {
    var date = moment('2014-11-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 30 days in Nov', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(30);
    });

    it('Nov 2014 starts on a Saturday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(6);
    });
  });

  describe('Dec 2014', function() {
    var date = moment('2014-12-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 30 days in Dec', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(31);
    });

    it('Dec 2014 starts on a Monday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      expect(days.length).toBe(1);
    });
  });

  describe('leap year', function() {
    var date = moment('2016-02-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date }/>
        );
    it('renders 29 days in Feb', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      expect(days.length).toBe(29);
    });
  });

  describe('Selecting a date', function() {
    var listener = jest.genMockFunction();
    var date = moment('2014-11-01');
    var element = TestUtils.renderIntoDocument(
          <Calendar date={ date } onSelectDate={ listener }/>
        );

    it('triggers an onClick when a date is slected', function() {
       var dates = scryByClass(element, 'hui-DatePickerDay');
      TestUtils.Simulate.click(dates[0]);

      expect(listener.mock.calls.length).toBe(1);
    });
  });
});
