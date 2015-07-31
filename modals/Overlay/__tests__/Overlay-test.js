'use strict';

var Overlay = require('../index');

describe('Overlay', function() {
  describe('default', function() {
    var component;

    beforeEach(function() {
      component = renderIntoDocument(<Overlay open={ false } />);
    });

    it('should render Overlay', function() {
      component = renderIntoDocument(<Overlay open={ false } />);

      component.should.exist;
    });

    it('should show the overlay when open', function() {
      component = renderIntoDocument(<Overlay open={ true } />);

      findByClass(component, 'hui-Overlay');
    });

    it('should hide the overlay when clicking close', function() {
      var closeCalled = false;
      var onClose = function() {
        closeCalled = true;
      }
      component = renderIntoDocument(<Overlay open={ true } onClose={ onClose }/>);
      var closeButton = findByClass(component, 'hui-Overlay__close');

      Simulate.click(closeButton);

      closeCalled.should.equal(true);
    });
  });
});
