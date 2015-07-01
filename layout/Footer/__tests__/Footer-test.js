"use strict";

jest.dontMock('../index');

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
    element.should.exist;
  });

  it('contains the logo', function() {
    var logo = findByClass(element, 'hui-Footer__logo');
    logo.should.exist;
  });

  it('contains portal links', function() {
    var links = scryByClass(element, 'hui-Footer__siteLink');
    links.should.exist;
  });

  it('contains legal links', function() {
    var links = scryByClass(element, 'hui-Footer__legalLink');
    links.should.exist;
  });

  it('contains social media', function() {
    var links = scryByClass(element, 'hui-SocialMediaLinks__link');
    links.should.exist;
  });
});
