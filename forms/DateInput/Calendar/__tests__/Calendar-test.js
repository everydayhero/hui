'use strict';

import Calendar from '../'
import moment from 'moment'

describe('Calendar', function() {
  describe('Jan 2014', function() {
    var date = moment('2014-01-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 31 days in Jan', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(31);
    });

    it('Jan 2014 starts on a Wednesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(3);
    });
  });

  describe('Feb 2014', function() {
    var date = moment('2014-02-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 28 days in Feb', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(28);
    });

    it('Feb 2014 starts on a Saturday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(6);
    });
  });

  describe('Mar 2014', function() {
    var date = moment('2014-03-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 31 days in Mar', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(31);
    });

    it('Mar 2014 starts on a Saturday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(6);
    });
  });

  describe('Apr 2014', function() {
    var date = moment('2014-04-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 30 days in Apr', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(30);
    });

    it('Apr 2014 starts on a Tuesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(2);
    });
  });

  describe('May 2014', function() {
    var date = moment('2014-05-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 31 days in May', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(31);
    });

    it('May 2014 starts on a Thursday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(4);
    });
  });

  describe('Jun 2014', function() {
    var date = moment('2014-06-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 30 days in Jun', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(30);
    });

    it('Jun 2014 starts on a Sunday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(0);
    });
  });

  describe('Jul 2014', function() {
    var date = moment('2014-07-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 31 days in Jul', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(31);
    });

    it('Jul 2014 starts on a Tuesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(2);
    });
  });

  describe('Aug 2014', function() {
    var date = moment('2014-08-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 31 days in Aug', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(31);
    });

    it('Aug 2014 starts on a Friday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(5);
    });
  });

  describe('Sep 2014', function() {
    var date = moment('2014-09-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 30 days in Sep', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(30);
    });

    it('Sep 2014 starts on a Monday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(1);
    });
  });

  describe('Oct 2014', function() {
    var date = moment('2014-10-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 30 days in Oct', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(31);
    });

    it('Oct 2014 starts on a Wednesday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(3);
    });
  });

  describe('Nov 2014', function() {
    var date = moment('2014-11-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 30 days in Nov', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(30);
    });

    it('Nov 2014 starts on a Saturday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(6);
    });
  });

  describe('Dec 2014', function() {
    var date = moment('2014-12-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 30 days in Dec', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(31);
    });

    it('Dec 2014 starts on a Monday', function() {
      var days = scryByClass(element, 'hui-DatePickerDay--filler');
      days.length.should.equal(1);
    });
  });

  describe('leap year', function() {
    var date = moment('2016-02-01');
    var element = renderIntoDocument(<Calendar date={ date }/>);

    it('renders 29 days in Feb', function() {
      var days = scryByClass(element, 'hui-DatePickerDay');

      days.length.should.equal(29);
    });
  });

  describe('Selecting a date', function() {
    var listener = sinon.spy();
    var date = moment('2014-11-01');
    var element = renderIntoDocument(<Calendar date={ date } onSelectDate={ listener }/>);

    it('triggers an onClick when a date is selected', function() {
      var dates = scryByClass(element, 'hui-DatePickerDay');
      Simulate.click(dates[0]);

      listener.should.have.been.called;
    });
  });
});
