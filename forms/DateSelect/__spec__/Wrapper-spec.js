describe('DateSelectWrapper', function() {
  var React             = require('react/addons');
  var DateSelectWrapper = require('../Wrapper');

  describe('defaults', function() {
    var element = TestUtils.renderIntoDocument(
          <DateSelectWrapper
            name="foo" />
        );
    var hiddenField = findByTag(element, 'input');

    expect(hiddenField.getDOMNode().value).to.equal('');
    expect(hiddenField.getDOMNode().name).to.equal('foo');
  });

  describe('change value', function() {
    var element = TestUtils.renderIntoDocument(
          <DateSelectWrapper
            name="foo" />
        );
    var hiddenField = findByTag(element, 'input');
    var dateSelect  = scryByTag(element, 'select')[0];
    var monthSelect = scryByTag(element, 'select')[1];
    var yearSelect  = scryByTag(element, 'select')[2];

    TestUtils.Simulate.change(dateSelect, {target: {value: 5}});
    TestUtils.Simulate.change(monthSelect, {target: {value: 10}});
    TestUtils.Simulate.change(yearSelect, {target: {value: 2002}});

    expect(hiddenField.getDOMNode().value).to.equal('2002-11-05');
  });

  describe('start with value', function() {
    var element = TestUtils.renderIntoDocument(
          <DateSelectWrapper
            name="foo"
            value="2001-12-12" />
        );
    var hiddenField = findByTag(element, 'input');

    expect(hiddenField.getDOMNode().value).to.equal('2001-12-12');
  });
});
