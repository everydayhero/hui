'use strict';

import Page from '../'

describe('Demo Page', function() {
  describe('default', function() {
    var page;

    beforeEach(function() {
      page = renderIntoDocument(Page)
    });

    it('should render Page', function() {
      page.should.exist;
    });
  });
});

