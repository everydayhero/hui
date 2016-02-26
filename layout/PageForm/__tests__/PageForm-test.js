'use strict';

import PageForm from '../'

describe('PageForm', function() {
  var pageImagePath = '../../images/alt_charity_bg.jpg';
  var formImagePath = '../../images/alt_charity_bg--blur.jpg';
  var pageForm;

  beforeEach(function() {
    pageForm = renderIntoDocument(<PageForm
      pageName={ "Example" }
      pageImagePath={ pageImagePath }
      formImagePath={ formImagePath }/>);
  });

  it('should render pageForm', function() {
    pageForm.should.exist;
  });
});
