"use strict";

jest.autoMockOff();
jest.mock('../../../lib/filepicker');

describe('FileInput', function() {
  var React       = require('react/addons');
  var FileInput   = require('../');
  var TestUtils   = React.addons.TestUtils;

  var findByClass = TestUtils.findRenderedDOMComponentWithClass;
  var noFileLabel = 'No file selected';
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<FileInput noFileLabel={noFileLabel} />);
  });

  describe('when no file selected', function() {
    it('should render the input field', function() {
      var input = findByClass(component, 'hui-FileInput__input');

      expect(input.getDOMNode().textContent).toEqual(noFileLabel);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      expect(button.getDOMNode().textContent).toEqual('Browse');
    });
  });

  describe('when has a file selected', function() {
    var filename = 'sample.gif';

    beforeEach(function() {
      component.setProps({
        value: {
          filename: filename
        }
      });
    });

    it('should render the input field', function() {
      var input = findByClass(component, 'hui-FileInput__input');

      expect(input.getDOMNode().textContent).toEqual(filename);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      expect(button.getDOMNode().textContent).toEqual('Replace');
    });

    it('should render the reset button', function() {
      var button = findByClass(component, 'hui-FileInput__reset');

      expect(button.getDOMNode()).not.toBeNull();
    });
  });

  describe('when errors', function() {
    it('should render the errors', function() {
      component.setProps({errors: ["is not good"]});
      var errors = findByClass(component, 'hui-InputErrors');

      expect(errors.getDOMNode().textContent).toContain("is not good");
    });
  });

});
