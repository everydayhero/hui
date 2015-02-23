"use strict";

jest.autoMockOff();

describe('DatePickerPeriod', function() {
  var React             = require('react/addons');
  var DatePickerPeriods = require('../');
  var moment            = require('moment');
  var TestUtils         = React.addons.TestUtils;
  var findByClass       = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass       = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('selection and navigation', function() {
    var date = moment("2014-10-20T14:30:00+10:00");
    var element;

    beforeEach(function() {
        element = TestUtils.renderIntoDocument(
          <DatePickerPeriods type="year" date={ date } current={ 2014 }/>
        );
    });

    it('renders three periods around current', function() {
      var periods = scryByClass(element, "hui-DatePickerPeriod");

      expect(periods[0].getDOMNode().textContent).toContain('2013');
      expect(periods[1].getDOMNode().textContent).toContain('2014');
      expect(periods[2].getDOMNode().textContent).toContain('2015');
    });

    it('renders a selected period', function() {
      var selected = findByClass(element, "hui-DatePickerPeriod--selected");

      expect(selected.getDOMNode().textContent).toContain('2014');
    });

    it('navigates forward', function() {
      var forward = findByClass(element, "hui-DatePickerPeriods__forward");
      TestUtils.Simulate.click(forward);

      var periods = scryByClass(element, "hui-DatePickerPeriod");

      expect(periods[2].getDOMNode().textContent).toContain('2016');
    });

    it('navigates backwards', function() {
      var back = findByClass(element, "hui-DatePickerPeriods__back");
      TestUtils.Simulate.click(back);

      var periods = scryByClass(element, "hui-DatePickerPeriod");

      expect(periods[0].getDOMNode().textContent).toContain('2012');
    });
  });

  describe('types', function() {
    var date = moment("2014-11-20T14:30:00+10:00");
    var element;

    beforeEach(function() {
        element = TestUtils.renderIntoDocument(
          <DatePickerPeriods type="month" date={ date } current={ 11 }/>
        );
    });

    it('renders three periods around current', function() {
      var periods = scryByClass(element, "hui-DatePickerPeriod");

      expect(periods[0].getDOMNode().textContent).toContain('Oct');
      expect(periods[1].getDOMNode().textContent).toContain('Nov');
      expect(periods[2].getDOMNode().textContent).toContain('Dec');
    });

    it('loops on forward', function() {
      var forward = findByClass(element, "hui-DatePickerPeriods__forward");
      TestUtils.Simulate.click(forward);

      var periods = scryByClass(element, "hui-DatePickerPeriod");

      expect(periods[2].getDOMNode().textContent).toContain('Jan');
    });

    it('loops on back', function() {
      var date = moment("2014-02-20T14:30:00+10:00");
      element = TestUtils.renderIntoDocument(
        <DatePickerPeriods type="month" date={ date } current={ 1 }/>
      );
      var back = findByClass(element, "hui-DatePickerPeriods__back");
      TestUtils.Simulate.click(back);

      var periods = scryByClass(element, "hui-DatePickerPeriod");

      expect(periods[0].getDOMNode().textContent).toContain('Dec');
    });
  });
});
