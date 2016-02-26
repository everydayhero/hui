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

      input.textContent.should.equal(noFileLabel);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      button.textContent.should.equal('Browse');
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

      input.textContent.should.equal(filename);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      button.textContent.should.equal('Replace');
    });

    it('should render the reset button', function() {
      var button = findByClass(component, 'hui-FileInput__reset');

      button.should.exist;
    });
  });

  describe('when errors', function() {
    it('should render the errors', function() {
      component.setProps({ errors: ['is not good'] });
      var errors = findByClass(component, 'hui-InputErrors');

      errors.textContent.should.contain('is not good');
    });
  });
});
