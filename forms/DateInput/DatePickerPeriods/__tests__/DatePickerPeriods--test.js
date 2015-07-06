'use strict';

var DatePickerPeriods = require('../');
var moment = require('moment');

describe('DatePickerPeriod', function() {
  describe('selection and navigation', function() {
    var date = moment('2014-10-20T14:30:00+10:00');
    var element;

    beforeEach(function() {
      var onChange = function(value) {
        date.year(value);
        this.setProps({ current: value, date });
      };
      element = renderIntoDocument(<DatePickerPeriods type="year" date={ date } current={ 2014 }/>);
      element.setProps({ onChange: onChange.bind(element) });
    });

    it('renders three periods around current', function() {
      var periods = scryByClass(element, 'hui-DatePickerPeriod');

      periods[0].getDOMNode().textContent.should.contain('2013');
      periods[1].getDOMNode().textContent.should.contain('2014');
      periods[2].getDOMNode().textContent.should.contain('2015');
    });

    it('renders a selected period', function() {
      var selected = findByClass(element, 'hui-DatePickerPeriod--selected');

      selected.getDOMNode().textContent.should.contain('2014');
    });

    it('navigates forward', function() {
      var forward = findByClass(element, 'hui-DatePickerPeriods__forward');
      var periods = scryByClass(element, 'hui-DatePickerPeriod');
      Simulate.click(forward);

      periods[2].getDOMNode().textContent.should.contain('2016');
    });

    it('navigates backwards', function() {
      var back = findByClass(element, 'hui-DatePickerPeriods__back');
      var periods = scryByClass(element, 'hui-DatePickerPeriod');
      Simulate.click(back);

      periods[0].getDOMNode().textContent.should.contain('2013');
    });
  });

  describe('types', function() {
    var date = moment('2014-11-20T14:30:00+10:00');
    var element;

    beforeEach(function() {
      var onChange = function(value) {
        date.month(value);
        this.setProps({ current: value, date });
      };
      element = renderIntoDocument(<DatePickerPeriods type="month" date={ date } current={ 11 }/>);
      element.setProps({ onChange: onChange.bind(element) });
    });

    it('renders three periods around current', function() {
      var periods = scryByClass(element, 'hui-DatePickerPeriod');

      periods[0].getDOMNode().textContent.should.contain('Oct');
      periods[1].getDOMNode().textContent.should.contain('Nov');
      periods[2].getDOMNode().textContent.should.contain('Dec');
    });

    it('loops on forward', function() {
      var forward = findByClass(element, 'hui-DatePickerPeriods__forward');
      var periods = scryByClass(element, 'hui-DatePickerPeriod');
      Simulate.click(forward);

      periods[2].getDOMNode().textContent.should.contain('Jan');
    });

    it('loops on back', function() {
      var back, periods;
      date = moment('2014-02-20T14:30:00+10:00');
      element = renderIntoDocument(
        <DatePickerPeriods type="month" date={ date } current={ 1 }/>
      );
      back = findByClass(element, 'hui-DatePickerPeriods__back');
      periods = scryByClass(element, 'hui-DatePickerPeriod');
      Simulate.click(back);

      periods[0].getDOMNode().textContent.should.contain('Jan');
    });
  });
});
