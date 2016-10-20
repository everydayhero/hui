'use strict'

import { expect } from 'chai'
import { mount } from 'enzyme'

import LoadingProgress from '../'

describe('LoadingProgress', function() {
  it('does not show progress state if "inProgress" flag is false', function() {
    var element = mount(<LoadingProgress inProgress={ false } />);

    expect(element.find('.hui-LoadingProgress__bar').length).to.equal(1)
    expect(element.find('.hui-LoadingProgress__bar--inProgress').length).to.equal(0)
  });

  it('shows progress state if "inProgress" flag is true', function() {
    var element = mount(<LoadingProgress inProgress={ true } />);

    expect(element.find('.hui-LoadingProgress__bar--inProgress').length).to.equal(1)
  });

  it('does adds the previous width of the bar after progress completed', function() {
    var element = mount(<LoadingProgress inProgress={ true } />);

    element.setProps({
      inProgress: false
    });

    element.find('.hui-LoadingProgress__bar')
      .prop('style').width.should.equal('100%');
  });
});
