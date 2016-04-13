'use strict'

import OptInToSubmit from '../'

let checkBoxProps = {
  label: 'Test Checkbox',
  id: 'test_checkbox',
  value: false,
  onChange(val) { checkBoxProps.value = val }
}
let submitOnceProps = {
  label: 'Test Button',
  onClick: sinon.spy()
}

describe('OptInToSubmit', () => {
  let testProps = { checkBoxProps, submitOnceProps }

  it('disables submit when unchecked', () => {
    let subject = renderIntoDocument(<OptInToSubmit { ...testProps } />)
    let checkbox = findByTag(subject, 'input').getDOMNode()
    let submit = findByTag(subject, 'button').getDOMNode()
    checkbox.checked.should.be.false
    submit.disabled.should.be.true
    Simulate.click(submit)
    submitOnceProps.onClick.should.not.have.been.called
  })

  it('enables submit when checked', () => {
    let subject = renderIntoDocument(<OptInToSubmit { ...testProps } />)
    let checkbox = findByTag(subject, 'input').getDOMNode()
    let submit = findByTag(subject, 'button').getDOMNode()
    Simulate.change(checkbox, { target: { checked: true } })
    checkbox.checked.should.be.true
    submit.disabled.should.be.false
    Simulate.click(submit)
    submitOnceProps.onClick.should.have.been.calledOnce
  })
})
