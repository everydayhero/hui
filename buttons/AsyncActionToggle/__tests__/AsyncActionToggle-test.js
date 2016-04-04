'use strict'

import AsyncActionToggle from '../'
import Promise from 'bluebird'

let props = {
  kind: 'cta',
  pre_action_label: 'test_pre_action',
  post_action_label: 'test_post_action',
  error_label: 'test_error',
  action: sinon.stub().returns(Promise.resolve())
}

describe('AsyncActionToggle', () => {
  it('executes an action on click', (done) => {
    let element = renderIntoDocument(<AsyncActionToggle { ...props } />)
    Simulate.click(findByTag(element, 'button'))
    setTimeout(() => {
      props.action.should.have.been.called
      done()
    }, 1)
  })

  it('displays pre- and post-action labels', (done) => {
    let element = renderIntoDocument(<AsyncActionToggle { ...props } />)
    element.getDOMNode().textContent.should.contain(props.pre_action_label)
    Simulate.click(findByTag(element, 'button'))
    setTimeout(() => {
      element.getDOMNode().textContent.should.contain(props.post_action_label)
      done()
    }, 2)
  })

  it('displays an error label if action fails', (done) => {
    let rejectAction = sinon.stub().returns(Promise.reject())
    let element = renderIntoDocument(<AsyncActionToggle { ...props } action={ rejectAction } />)
    element.getDOMNode().textContent.should.contain(props.pre_action_label)
    Simulate.click(findByTag(element, 'button'))
    setTimeout(() => {
      rejectAction.should.have.been.called
      element.getDOMNode().textContent.should.contain(props.error_label)
      done()
    }, 1)
  })
})
