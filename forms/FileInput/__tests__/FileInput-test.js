'use strict'

import { mount } from 'enzyme'
import { expect } from 'chai'

import FileInput from '../'

describe('FileInput', function() {
  var noFileLabel = 'No file selected';
  var component;

  beforeEach(function() {
    component = mount(<FileInput noFileLabel={noFileLabel} />);
  });

  describe('when no file selected', function() {
    it('should render the input field', function() {
      var input = component.find('.hui-FileInput__input');

      input.text().should.equal(noFileLabel);
    });

    it('should render the browse button', function() {
      var button = component.find('.hui-FileInput__browse');

      button.text().should.equal('Browse');
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
      var input = component.find('.hui-FileInput__input');

      input.text().should.equal(filename);
    });

    it('should render the browse button', function() {
      var button = component.find('.hui-FileInput__browse');

      button.text().should.equal('Replace');
    });

    it('should render the reset button', function() {
      var button = component.find('.hui-FileInput__reset');

      expect(button.length).to.equal(1);
    });
  });

  describe('when errors', function() {
    it('should render the errors', function() {
      component.setProps({ errors: ['is not good'] });
      var errors = component.find('.hui-InputErrors');

      errors.text().should.contain('is not good');
    });
  });
});
