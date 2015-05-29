"use strict";

describe('DateSelect', function() {
  var React       = require('react/addons');
  var DateSelect       = require('../');

  describe('defaults', function() {
    var element = TestUtils.renderIntoDocument(
      <DateSelect/>
    );
    var dateSelect = scryByTag(element, 'select')[0];
    var monthSelect = scryByTag(element, 'select')[1];
    var yearSelect = scryByTag(element, 'select')[2];

    var dateDisplay = scryByClass(element, 'hui-SelectInput__displayValue')[0];
    var monthDisplay = scryByClass(element, 'hui-SelectInput__displayValue')[1];
    var yearDisplay = scryByClass(element, 'hui-SelectInput__displayValue')[2];

    it('value of null', function() {
      expect(dateSelect.getDOMNode().value).to.equal('');
      expect(monthSelect.getDOMNode().value).to.equal('');
      expect(yearSelect.getDOMNode().value).to.equal('');
    });

    it('shows a default display value of 1980-01-01', function() {
      expect(dateDisplay.getDOMNode().textContent).to.contain('1');
      expect(monthDisplay.getDOMNode().textContent).to.contain('Jan');
      expect(yearDisplay.getDOMNode().textContent).to.contain('1980');
    });
  });

  describe('onChange', function() {
    var element;
    var date;
    var onChange = function(value) {
          date = value;
        }

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(
        <DateSelect onChange={onChange} value='1982-01-01'/>
      );
    });

    it('is fired onChange date', function() {
      var dateSelect = scryByTag(element, 'select')[0];

      TestUtils.Simulate.change(dateSelect, {target: {value: 5}});
      expect(date).to.equal('1982-01-05');
    });

    it('is fired onChange month', function() {
      var monthSelect = scryByTag(element, 'select')[1];

      TestUtils.Simulate.change(monthSelect, {target: {value: 11}});
      expect(date).to.equal('1982-12-01');
    });

    it('is fired onChange year', function() {
      var yearSelect = scryByTag(element, 'select')[2];

      TestUtils.Simulate.change(yearSelect, {target: {value: 2012}});
      expect(date).to.equal('2012-01-01');
    });
  });

  describe('validation behavior', function() {
    it('when valid no hui-DateSelect--error class', function() {
      var element = TestUtils.renderIntoDocument(
        <DateSelect/>
      );
      var errorClasses = scryByClass(element, 'hui-DateSelect--error');
      expect(errorClasses.length).to.equal(0);
    });

    it('when invalid there is a hui-DateSelect--error class', function() {
      var element = TestUtils.renderIntoDocument(
        <DateSelect errors={ ['error'] }/>
      );
      var errorClasses = scryByClass(element, 'hui-DateSelect--error');
      expect(errorClasses.length).to.equal(1);
    });

    it('shows errors', function() {
      var element = TestUtils.renderIntoDocument(
        <DateSelect valid={false} errors={ ['foo'] } />
      );
      var errorClasses = scryByClass(element, 'hui-InputErrors');
      expect(errorClasses.length).to.equal(1);
    });
  });
});
