'use strict'

import SubmitOnce from '../'

describe('SubmitOnce', () => {
  describe('with an onClick handler', () => {
    const onClickSubmit = sinon.spy()

    it('should submit at most once', () => {
      let subject = renderIntoDocument(<SubmitOnce onClick={onClickSubmit} />)
      let node = findByTag(subject, 'button')
      Simulate.click(node)
      Simulate.click(node)
      Simulate.click(node)
      onClickSubmit.should.have.been.calledOnce
    })
  })

  describe('with a formId', () => {
    const formSubmit = sinon.spy()

    it('should submit at most once', () => {
      document.forms.test_form = { submit: formSubmit }
      let subject = renderIntoDocument(<SubmitOnce formId={'test_form'} />)
      let node = findByTag(subject, 'button')
      Simulate.click(node)
      Simulate.click(node)
      Simulate.click(node)
      formSubmit.should.have.been.calledOnce
    })
  })
})
