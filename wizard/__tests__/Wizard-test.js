'use strict';

var Wizard = require('../index');

describe('Wizard', function() {
  describe('default', function() {
    var component;

    it('should render Wizard', function() {
      component = renderIntoDocument(<Wizard/>);

      component.should.exist;
    });
  });
});
