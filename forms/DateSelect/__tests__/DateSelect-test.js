'use strict';

import DateSelect from '../'

describe('DateSelect', function() {
  describe('defaults', function() {
    var element = renderIntoDocument(<DateSelect/>);

    var dateSelect = scryByTag(element, 'select')[0];
    var monthSelect = scryByTag(element, 'select')[1];
    var yearSelect = scryByTag(element, 'select')[2];

    var dateDisplay = scryByClass(element, 'hui-SelectInput__displayValue')[0];
    var monthDisplay = scryByClass(element, 'hui-SelectInput__displayValue')[1];
    var yearDisplay = scryByClass(element, 'hui-SelectInput__displayValue')[2];

    it('value of null', function() {
      dateSelect.getDOMNode().value.should.equal('');
      monthSelect.getDOMNode().value.should.equal('');
      yearSelect.getDOMNode().value.should.equal('');
    });

    it('shows a default display value of 1980-01-01', function() {
      dateDisplay.getDOMNode().textContent.should.contain('1');
      monthDisplay.getDOMNode().textContent.should.contain('Jan');
      yearDisplay.getDOMNode().textContent.should.contain('1980');
    });
  });

  describe('onChange', function() {
    var element;
    var date;
    var onChange = function(value) {
      date = value;
    };

    beforeEach(function() {
      element = renderIntoDocument(
        <DateSelect onChange={ onChange } value="1982-01-01"/>
      );
    });

    it('is fired onChange date', function() {
      var dateSelect = scryByTag(element, 'select')[0];

      Simulate.change(dateSelect, { target: { value: 5 }});
      date.should.equal('1982-01-05');
    });

    it('is fired onChange month', function() {
      var monthSelect = scryByTag(element, 'select')[1];

      Simulate.change(monthSelect, { target: { value: 11 }});
      date.should.equal('1982-12-01');
    });

    it('is fired onChange year', function() {
      var yearSelect = scryByTag(element, 'select')[2];

      Simulate.change(yearSelect, { target: { value: 2012 }});
      date.should.equal('2012-01-01');
    });
  });

  describe('validation behavior', function() {
    it('when valid no hui-DateSelect--error class', function() {
      var element = renderIntoDocument(
        <DateSelect/>
      );
      var errorClasses = scryByClass(element, 'hui-DateSelect--error');
      errorClasses.length.should.equal(0);
    });

    it('when invalid there is a hui-DateSelect--error class', function() {
      var element = renderIntoDocument(
        <DateSelect errors={ ['error'] }/>
      );
      var errorClasses = scryByClass(element, 'hui-DateSelect--error');
      errorClasses.length.should.equal(1);
    });

    it('shows errors', function() {
      var element = renderIntoDocument(
        <DateSelect valid={false} errors={ ['foo'] } />
      );
      var errorClasses = scryByClass(element, 'hui-InputErrors');
      errorClasses.length.should.equal(1);
    });
  });

  describe('number of days in month', function() {
    it('number of days in Jan', function() {
      var element = renderIntoDocument(
        <DateSelect value="1982-01-01"/>
      );
      element.getDays().length.should.equal(31);
    });

    it('number of days in Sep', function() {
      var element = renderIntoDocument(
        <DateSelect value="1982-09-01"/>
      );
      element.getDays().length.should.equal(30);
    });

    it('number of days in Feb regular year', function() {
      var element = renderIntoDocument(
        <DateSelect value="1982-02-01"/>
      );
      element.getDays().length.should.equal(28);
    });

    it('number of days in Feb leap year', function() {
      var element = renderIntoDocument(
        <DateSelect value="2016-02-01"/>
      );
      element.getDays().length.should.equal(29);
    });
  });
});
