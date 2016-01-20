'use strict'

import ToggleableOption from '../'

describe('ToggleableOption', () => {
  let props = {
    onChange: sinon.stub().returns(Promise.resolve()),
    name: 'test_option',
    label: 'Test Option Label',
    value: false
  }

  it('renders with label', () => {
    let element = renderIntoDocument(<ToggleableOption { ...props } />)
    element.getDOMNode().textContent.should.contain(props.label)
    findByClass(element, 'ToggleableOption__checkbox').props.className.should.not.contain('ToggleableOption__checkbox--error')
  })

  it('displays unchecked state', () => {
    let element = renderIntoDocument(<ToggleableOption { ...props } />)
    findByClass(element, 'ToggleableOption__hiddenInput').getDOMNode().checked.should.be.false
    findByClass(element, 'ToggleableOption__checkbox').props.className.should.not.contain('ToggleableOption__checkbox--checked')
  })

  it('displays checked state', () => {
    let element = renderIntoDocument(<ToggleableOption { ...props } value={ true } />)
    findByClass(element, 'ToggleableOption__hiddenInput').getDOMNode().checked.should.be.true
    findByClass(element, 'ToggleableOption__checkbox--checked').should.exist
  })

  it('displays partialChecked state', () => {
    let element = renderIntoDocument(<ToggleableOption { ...props } partialChecked={ true } />)
    findByClass(element, 'ToggleableOption__hiddenInput').getDOMNode().checked.should.be.false
    findByClass(element, 'ToggleableOption__checkbox--partial').should.exist
  })

  it('executes onChange handler', () => {
    let element = renderIntoDocument(<ToggleableOption { ...props } />)
    let input = findByClass(element, 'ToggleableOption__hiddenInput')
    input.getDOMNode().checked.should.be.false
    Simulate.change(input, { target: { checked: true }})
    props.onChange.should.have.been.calledWith(props.name, true)
  })

  it('displays error message', () => {
    let element = renderIntoDocument(<ToggleableOption { ...props } />)
    element.setState({ error: true })
    findByClass(element, 'ToggleableOption__error').getDOMNode().textContent.should.contain(element.t('error_message'))
    findByClass(element, 'ToggleableOption__checkbox--error').should.exist
  })
})
