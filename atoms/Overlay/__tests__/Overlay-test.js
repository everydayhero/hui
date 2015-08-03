'use strict'

import Overlay from '../'

describe('Overlay', () => {
  it('renders something', () => {
    let overlay = <Overlay />;
    let element = renderIntoDocument(overlay);

    element.getDOMNode().should.exist;
  });

  it('calls the onClose prop when clicking the close button', () => {
    let spy = sinon.spy();
    let overlay = <Overlay onClose={ spy } />;
    let element = renderIntoDocument(overlay);
    let closeButton = findByClass(element, 'Overlay__close');
    Simulate.click(closeButton);

    spy.should.have.been.called;
  });

  it('renders close button with onClose', () => {
    let spy = sinon.spy();
    let overlay = <Overlay onClose={ spy } />;
    let element = renderIntoDocument(overlay);
    let closeButton = findByClass(element, 'Overlay__close');

    closeButton.should.exist;
  });

  it('hides close button without onClose', () => {
    let overlay = <Overlay />;
    let element = renderIntoDocument(overlay);
    let closeButton = scryByClass(element, 'Overlay__close')[0];

    expect(closeButton).to.not.exist;
  });

  it('hides close button when showCloseButton is false', () => {
    let spy = sinon.spy();
    let overlay = <Overlay onClose={ spy } showCloseButton={ false }/>;
    let element = renderIntoDocument(overlay);
    let closeButton = scryByClass(element, 'Overlay__close')[0];

    expect(closeButton).to.not.exist;
  });

  it('inverts the background', () => {
    let spy = sinon.spy();
    let overlay = <Overlay onClose={  spy } inverse={ true }/>;
    let element = renderIntoDocument(overlay);

    findByClass(element, 'Overlay--inverse');
  });
});
