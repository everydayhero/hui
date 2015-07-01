'use strict';

var DatePickerPeriod = require('../');

describe('DatePickerPeriod', function() {
  describe('selected', function() {
    var element = renderIntoDocument(<DatePickerPeriod value={ 2014 } current={ 2014 }/>);

    it('renders as selected', function() {
      var className = element.getDOMNode().className;

      className.should.contain('hui-DatePickerPeriod--selected');
    });
  });

  describe('onClick', function() {
    it('is fired onClick', function() {
      var parsedValue;
      var value = 2;
      var listener = val => parsedValue = val;
      var element = renderIntoDocument(<DatePickerPeriod onSelect={ listener } value={ value } />);

      var period = element.getDOMNode();
      Simulate.click(period);

      parsedValue.should.equal(value);
    });
  });
});
