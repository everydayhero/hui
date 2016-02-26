'use strict'

import FileInput from '../'

describe('FileInput', function() {
  var noFileLabel = 'No file selected';
  var component;

  beforeEach(function() {
    component = renderIntoDocument(<FileInput noFileLabel={noFileLabel} />);
  });

  describe('when no file selected', function() {
    it('should render the input field', function() {
      var input = findByClass(component, 'hui-FileInput__input');

      input.getDOMNode().textContent.should.equal(noFileLabel);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      button.getDOMNode().textContent.should.equal('Browse');
    });
  });

  describe('when has a file selected', function() {
    var filename = 'sample.gif';

    beforeEach(function() {
      component.setProps({
        value: { filename }
      });
    });

    it('should render the input field', function() {
      var input = findByClass(component, 'hui-FileInput__input');

      input.getDOMNode().textContent.should.equal(filename);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      button.getDOMNode().textContent.should.equal('Replace');
    });

    it('should render the reset button', function() {
      var button = findByClass(component, 'hui-FileInput__reset');

      button.getDOMNode().should.exist;
    });
  });

  describe('when errors', function() {
    it('should render the errors', function() {
      component.setProps({ errors: ['is not good'] });
      var errors = findByClass(component, 'hui-InputErrors');

      errors.getDOMNode().textContent.should.contain('is not good');
    });
  });
});
