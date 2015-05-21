"use strict";

jest.dontMock('../index');

describe('PageForm', function() {
  var React     = require('react/addons');
  var PageForm    = require('../index');
  var TestUtils = React.addons.TestUtils;
  var pageImagePath  = '../../images/alt_charity_bg.jpg';
  var formImagePath  = '../../images/alt_charity_bg--blur.jpg';

  describe('default', function() {
    var pageForm;

    beforeEach(function() {
      pageForm = TestUtils.renderIntoDocument(<PageForm
        pageName={ "Example" }
        pageImagePath={ pageImagePath }
        formImagePath={ formImagePath }/>);
    });

    it('should render pageForm', function() {
      expect(pageForm).not.toBeNull();
    });
  });
});
