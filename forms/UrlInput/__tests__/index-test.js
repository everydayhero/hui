"use strict";

jest.autoMockOff();

describe('UrlInput', function() {
  var React             = require('react/addons');
  var UrlInput          = require('../');
  var TestUtils         = React.addons.TestUtils;

  var findByTag         = TestUtils.findRenderedDOMComponentWithTag;
  var scryByClass       = TestUtils.scryRenderedDOMComponentsWithClass;

  describe('defaults', function() {
    it('protocol is "http" by default', function() {
      var element, protocol;
      element = TestUtils.renderIntoDocument(<UrlInput />);
      protocol = findByTag(element, 'select');

      expect(protocol.getDOMNode().value).toBe('http://');
    });

    it('strips the protocol from supplied paths and sets the protocol to match', function() {
      var element, protocol, path;
      element = TestUtils.renderIntoDocument(<UrlInput value="https://example.com"/>);
      protocol = findByTag(element, 'select');
      path = findByTag(element, 'input');

      expect(path.getDOMNode().value).toBe('example.com');
      expect(protocol.getDOMNode().value).toBe('https://');
    });
  });

  describe('onChange', function() {
    var changeFn, element, protocol, path;
    beforeEach(function() {
      changeFn = jest.genMockFn();
      element = TestUtils.renderIntoDocument(<UrlInput value="http://example.org" onChange={ changeFn } />);
      path = findByTag(element, 'input');
      protocol = findByTag(element, 'select');
    });

    it('calls the onChange function whenever the path changes', function() {
      TestUtils.Simulate.change(path, {target: {value: 'https://example.com'}});

      expect(path.getDOMNode().value).toBe('example.com');
      expect(changeFn.mock.calls[0][0]).toBe('https://example.com');
    });

    it('calls the onChange function whenever the protocol changes', function() {
      TestUtils.Simulate.change(protocol, {target: {value: 'https://'}});

      expect(path.getDOMNode().value).toBe('example.org');
      expect(protocol.getDOMNode().value).toBe('https://');
      expect(changeFn.mock.calls[0][0]).toBe('https://example.org');
    });

    it('does not change the form to include only the protocol when the path is remved', function() {
      TestUtils.Simulate.change(path, {target: {value: ''}});

      expect(changeFn.mock.calls[0][0]).toBe('');
    });
  });

  describe('validation behavior', function() {
    var element, errorClasses;

    it('does not have TextInput--error class when errors is empty', function() {
      element = TestUtils.renderIntoDocument(<UrlInput errors={ [] } />);
      errorClasses = scryByClass(element, 'TextInput--error');

      expect(errorClasses.length).toBe(0);
    });

    it('does have TextInput--error class when errors is present', function() {
      element = TestUtils.renderIntoDocument(<UrlInput errors={ ['foobar'] } />);
      errorClasses = scryByClass(element, 'TextInput--error');

      expect(errorClasses.length).toBe(1);
    });
  });
});
