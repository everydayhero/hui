'use strict';

var Step = require('../index');

describe('Step', function() {
  describe('default', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(<Step/>);
    });

    it('should render Step', function() {
      component.should.exist;
    });
  });
});
