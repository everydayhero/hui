'use strict';

import AvatarInput from '../'

describe('AvatarInput', function() {
  var component;

  describe('default', function() {
    beforeEach(function() {
      component = renderIntoDocument(<AvatarInput/>);
    });

    it('should render the component', function() {
      findByClass(component, 'hui-AvatarInput');
    });

    it('should not render the page name', function() {
      var elements = scryByClass(component, 'hui-AvatarInput__pageName');

      expect(elements.length).to.equal(0);
    });

    it('should render a blank image', function() {
      var element = findByClass(component, 'hui-AvatarInput__preview');

      expect(element.tagName).to.equal('SPAN');
    });
  });

  describe('populated', function() {
    var value = { url: 'http://example.com/foo.jpg' };
    var pageName = 'bar';

    beforeEach(function() {
      component = renderIntoDocument(<AvatarInput value={ value } pageName={ pageName } />);
    });

    it('should render the page name', function() {
      var element = findByClass(component, 'hui-AvatarInput__pageName');

      element.textContent.should.equal(pageName);
    });

    it('should render an image', function() {
      var element = findByClass(component, 'hui-AvatarInput__preview');

      expect(element.src).to.equal(value.url);
    });
  });
});
