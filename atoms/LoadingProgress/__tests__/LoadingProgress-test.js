'use strict'

import LoadingProgress from '../'

describe('LoadingProgress', function() {
  it('does not show progress state if "inProgress" flag is false', function() {
    var componenet = <LoadingProgress inProgress={ false } />;
    var element = renderIntoDocument(componenet);

    findByClass(element, 'hui-LoadingProgress__bar');
  });

  it('shows progress state if "inProgress" flag is true', function() {
    var componenet = <LoadingProgress inProgress={ true } />;
    var element = renderIntoDocument(componenet);

    findByClass(element, 'hui-LoadingProgress__bar--inProgress');
  });

  it('does adds the previous width of the bar after progress completed', function() {
    var componenet = <LoadingProgress inProgress={ true } />;
    var element = renderIntoDocument(componenet);

    element.setProps({
      inProgress: false
    });

    element.style().width.should.equal('100%');
  });
});
