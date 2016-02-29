'use strict'

import FormRow from '../'

describe('FormRow', function() {
  describe('defaults', function() {
    var element = renderIntoDocument(
          <FormRow/>
        );

    it('it renders a FormRow', function() {
      findByClass(element, 'hui-FormRow');
    });
  });

  describe('properties', function() {
    var element = renderIntoDocument(
          <FormRow label="foo" id="bar" tip="tip"/>
        );

    it('does render a help text', function() {
      var label = findByClass(element, 'hui-FormRow__tip');

      label.textContent.should.equal('tip')
    });

    xit('does render with the id given to it', function() {
      var row = findByClass(element, 'hui-FormRow');
      findByAttribute(row, 'id', 'bar');
    });
  });
});
