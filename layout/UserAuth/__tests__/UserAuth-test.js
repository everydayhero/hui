'use strict'

import UserAuth from '../index'

describe('UserAuth', function() {
  var component;

  beforeEach(function() {
    component = renderIntoDocument(<UserAuth signInUrl="#" signUpUrl="#"/>);
  });

  it('should render UserAuth', function() {
    component.should.exist;
  });

  it('should render a Sign Up link', function() {
    var node = findByClass(component, 'hui-Button');

    node.getDOMNode().textContent.should.contain('Sign Up');
  });

  it('should render a Sign In link', function() {
    var node = findByClass(component, 'hui-UserAuth__signIn');

    node.getDOMNode().textContent.should.contain('Sign In');
  });
});
