"use strict";

var Footer = require('../index.js');

describe('Footer', function() {
  var element;

  before(function() {
    element = TestUtils.renderIntoDocument(<Footer />);
  });

  it('renders', function() {
    element.should.exist;
  });

  it('contains the logo', function() {
    var logo = findByClass(element, 'Footer__logo');
    logo.should.exist;
  });

  it('contains portal links', function() {
    var links = scryByClass(element, 'Footer__siteLink');
    links.should.exist;
  });

  it('contains legal links', function() {
    var links = scryByClass(element, 'Footer__legalLink');
    links.should.exist;
  });

  it('contains social media', function() {
    var links = scryByClass(element, 'SocialMediaLinks__link');
    links.should.exist;
  });
});
