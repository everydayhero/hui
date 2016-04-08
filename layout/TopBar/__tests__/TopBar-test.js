'use strict'

import TopBar from '../index'

describe('TopBar', function() {

  describe('default', function() {
    var topBar;

    beforeEach(function() {
      topBar = renderIntoDocument(<TopBar/>);
    });

    it('should render TopBar', function() {
      topBar.should.exist;
    });
  });
});
