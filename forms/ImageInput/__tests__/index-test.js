"use strict";

jest.autoMockOff();

describe('Image Input', function() {
  var React         = require('react/addons');
  var ImageInput    = require('../');
  var TestUtils     = React.addons.TestUtils;
  var findByClass   = TestUtils.findRenderedDOMComponentWithClass;
  var scryByClass   = TestUtils.scryRenderedDOMComponentsWithClass;
  var component;

  describe('image', function() {
    it('should render image when it is present', function() {
      var image = { url: 'url', filename: 'file name' };
      component = TestUtils.renderIntoDocument(<ImageInput value={ image } />);
      findByClass(component, 'hui-ImageInput__img');
    });

    it('should not render image when it is absent', function() {
      var image  = { url: null, filename: null };
      component  = TestUtils.renderIntoDocument(<ImageInput value={ image } />);
      var images = scryByClass(component, 'hui-ImageInput__img');

      expect(images.length).toBe(0);
    });
  });
});
