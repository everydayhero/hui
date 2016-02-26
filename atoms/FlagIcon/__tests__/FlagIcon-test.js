'use strict'

import FlagIcon from '../'

describe('FlagIcon', function () {
  it('renders a flag icon', function() {
    var element = renderIntoDocument(<FlagIcon country="AU"/>);
    var iconClass = element.getDOMNode().children[0].className;
    expect(iconClass).to.eq('hui-Flag hui-Flag-au');
  });
});
