'use strict'

import FlashMessage from '../'

describe('FlashMessage', function() {
  it('does not show a flash message when false', function() {
    var message = 'Something good happened.';
    var component = <FlashMessage show={ false } message={ message }  type="success" />;
    var element = renderIntoDocument(component);

    var showClass = scryByClass(element, 'hui-FlashMessage__message--show');
    var messageText = findByClass(element, 'hui-FlashMessage__message').textContent;

    findByClass(element, 'hui-FlashMessage__message--success');
    expect(showClass.length).to.equal(0);
    expect(messageText).to.contain(message);
  });

  it('shows a flash message when true', function() {
    var component = <FlashMessage  show={ true } type="error" />;
    var element = renderIntoDocument(component);

    findByClass(element, 'hui-FlashMessage__message--error');
    findByClass(element, 'hui-FlashMessage--show');
  });

  it('clicking dismiss triggers callback', function() {
    var dismissCalled = false;
    var callback = function(){ dismissCalled = true; }
    var component = <FlashMessage  show={ true } type="alert" onDismiss={ callback } />;
    var element = renderIntoDocument(component);
    var dismiss = findByClass(element, 'hui-FlashMessage__dismiss')
    Simulate.click(dismiss);

    findByClass(element, 'hui-FlashMessage__message--alert');
    expect(dismissCalled).to.equal(true);
  });
});
