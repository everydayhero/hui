'use strict'

const proxyquire = require('proxyquire')
  .noCallThru()
  .noPreserveCache()

window.FB = {}
var openPopup = false
var openFacebookShare = false
var onComplete = function() {}
var passedUrl
var passedCallback
var shareUrl = 'http://foo.com'

var component
const Share = proxyquire('../', {
  '../../lib/openPopup': function (url, config, callback) {
    openPopup = true
    passedUrl = url
    passedCallback = callback
  }
}).default

describe('Share', function() {
  describe('default', function() {
    beforeEach(function() {
      openPopup = false;
      window.FB = false;
      component = renderIntoDocument(
        <Share kind="facebook" onComplete={ onComplete } shareUrl={ shareUrl }/>
      );
    });

    it('calls open popup on click', function(){
      var button = findByClass(component, 'hui-Button');

      Simulate.click(button);

      expect(openPopup).to.equal(true);
      expect(passedUrl).to.equal('http://www.facebook.com/sharer.php?u=http%3A%2F%2Ffoo.com');
      expect(passedCallback).to.equal(onComplete);
    });
  });

  describe('facebook API present', function() {
    beforeEach(function() {
      window.FB = {};
      openFacebookShare = false;
      component = renderIntoDocument(<Share kind="facebook" />);
    });

    it('calls FB api when present', function(){
      component.openFacebookShare = function() { openFacebookShare = true; }
      var button = findByClass(component, 'hui-Button');

      Simulate.click(button);

      expect(openFacebookShare).to.equal(true);
    });
  });
});
