'use strict'

import Overlay from '../'

describe('Overlay', () => {
  it('renders something', () => {
    let overlay = <Overlay />;
    let element = renderIntoDocument(overlay);

    element.should.exist;
  });

  it('calls the onClose prop when clicking the close button', () => {
    let spy = sinon.spy();
    let overlay = <Overlay onClose={ spy } />;
    let element = renderIntoDocument(overlay);
    let closeButton = findByClass(element, 'hui-Overlay__close');
    Simulate.click(closeButton);

    spy.should.have.been.called;
  });

  it('renders close button with onClose', () => {
    let spy = sinon.spy();
    let overlay = <Overlay onClose={ spy } />;
    let element = renderIntoDocument(overlay);
    let closeButton = findByClass(element, 'hui-Overlay__close');

    closeButton.should.exist;
  });

  it('hides close button without onClose', () => {
    let overlay = <Overlay />;
    let element = renderIntoDocument(overlay);
    let closeButton = scryByClass(element, 'hui-Overlay__close')[0];

    expect(closeButton).to.not.exist;
  });

  it('hides close button when showCloseButton is false', () => {
    let spy = sinon.spy();
    let overlay = <Overlay onClose={ spy } showCloseButton={ false }/>;
    let element = renderIntoDocument(overlay);
    let closeButton = scryByClass(element, 'hui-Overlay__close')[0];

    expect(closeButton).to.not.exist;
  });

  it('inverts the background', () => {
    let overlay = <Overlay inverse={ true }/>;
    let element = renderIntoDocument(overlay);

    findByClass(element, 'hui-Overlay--inverse');
  });

  it('allows scrolling on the overlay', () => {
    let overlay = <Overlay scroll={ true }/>;
    let element = renderIntoDocument(overlay);

    findByClass(element, 'hui-Overlay--scroll');
  });
});
