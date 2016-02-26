'use strict'

import DatePickerPeriod from '../'

import ReactDOM from 'react-dom'

describe('DatePickerPeriod', function() {
  describe('selected', function() {
    var element = renderIntoDocument(<DatePickerPeriod value={ 2014 } current={ 2014 }/>);

    it('renders as selected', function() {
      var className = ReactDOM.findDOMNode(element).className

      className.should.contain('hui-DatePickerPeriod--selected');
    });
  });

  describe('onClick', function() {
    it('is fired onClick', function() {
      var parsedValue;
      var value = 2;
      var listener = val => parsedValue = val;
      var element = renderIntoDocument(<DatePickerPeriod onSelect={ listener } value={ value } />);

      var period = ReactDOM.findDOMNode(element);
      Simulate.click(period);

      parsedValue.should.equal(value);
    });
  });
});
