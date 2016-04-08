'use strict'

import Masthead from '../index'

describe('Masthead', function() {
  describe('default', function() {
    var component;

    beforeEach(function() {
      document.implementation.hasFeature = () => true;
      component = renderIntoDocument(<Masthead imagePath="/" href="foo"/>);
    });

    it('should render Masthead', function() {
      component.should.exist;
    });

    it('should not render application name', function() {
      scryByClass(component, 'hui-Masthead__appName').length.should.equal(0);
    });

    it('should render a anchor with href foo', function() {
      var href = findByTag(component, 'a').href;

      href.should.contain('foo');
    });
  });

  describe('application Name', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(<Masthead appName="foo" imagePath="/"/>);
    });

    it('should render application name', function() {
      scryByClass(component, 'hui-Masthead__appName').length.should.equal(1);
    });
  });
});
