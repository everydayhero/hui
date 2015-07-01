"use strict";

var Footer      = require('../index');
var React       = require('react/addons');
var TestUtils   = React.addons.TestUtils;
var scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

describe('Footer', function() {
  var element;

  beforeEach(function() {
    element = TestUtils.renderIntoDocument(<Footer/>);
  });

  it('renders', function() {
    expect(element).not.toBeNull();
    console.log(element);
  });

  it('contains the logo', function() {
    expect(findByClass(element, 'hui-Footer__logo').length).toBe(1);
  });

  it('contains portal links', function() {
    expect(scryByClass(element, 'hui-Footer__siteLink').length).toBe(1);
  });

  it('contains legal links', function() {
    expect(scryByClass(element, 'hui-Footer__legalLink').length).toBe(1);
  });

  it('contains social media', function() {
    expect(scryByClass(element, 'hui-SocialMediaLinks__link').length).toBe(1);
  });
});
