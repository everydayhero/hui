'use strict'

import ToggleableOptionGroup from '../'

describe('ToggleableOptionGroup', () => {
  var props = {
    onChange: sinon.stub().returns(Promise.resolve()),
    options: {
      test_one: {
        label: 'Test Option One',
        value: false
      },
      test_two: {
        label: 'Test Option Two',
        value: false
      },
      test_three: {
        label: 'Test Option Three',
        value: true
      },
      test_four: {
        label: 'Test Option Four',
        value: true
      }
    },
    name: 'test_group',
    label: 'Test Group'
  }

  it('renders a group of options', () => {
    let element = renderIntoDocument(<ToggleableOptionGroup { ...props } />)
    let text = element.getDOMNode().textContent
    text.should.contain(props.label)
    _.forEach(props.options, d => text.should.contain(d.label))
    findByClass(element, 'ToggleableOption__SecondaryOptions').should.exist
  })

  it('renders a primary option', () => {
    let element = renderIntoDocument(<ToggleableOptionGroup { ...props } />)
    let primary = findByClass(element, 'ToggleableOptionGroup__PrimaryOption')
    primary.should.exist
    findByClass(primary, 'ToggleableOption').getDOMNode().textContent.should.contain(props.label)
    findByClass(primary, 'ToggleableOption__checkbox--partial').should.exist
  })

  it('executes onChange callback on secondary options to match primary option changes', () => {
    let element = renderIntoDocument(<ToggleableOptionGroup { ...props } />)
    let primary = findByClass(element, 'ToggleableOptionGroup__PrimaryOption')
    let input = findByClass(primary, 'ToggleableOption__hiddenInput')
    input.getDOMNode().checked.should.be.false
    Simulate.change(input, { target: { checked: true }})
    props.onChange.should.have.callCount(2)
    _.forEach(props.options, (d, k) => !d.value && props.onChange.should.have.been.calledWith(k, true))
  })

  it('renders a singular option as the primary option', () => {
    let singleOption = { test_singular: { label: 'Test Singular Option', value: true }}
    let element = renderIntoDocument(<ToggleableOptionGroup { ...props } options={ singleOption }/>)
    let text = element.getDOMNode().textContent
    text.should.not.contain(props.label)
    text.should.contain(singleOption.test_singular.label)
    text.should.not.contain(props.options.test_one.label)
  })
})
