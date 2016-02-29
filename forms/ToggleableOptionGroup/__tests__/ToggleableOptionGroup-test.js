'use strict'

import ReactDOM from 'react-dom'
import ToggleableOptionGroup from '../'
import _ from 'lodash'

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
    let text = ReactDOM.findDOMNode(element).textContent
    text.should.contain(props.label)
    _.forEach(props.options, d => text.should.contain(d.label))
    findByClass(element, 'ToggleableOption__SecondaryOptions').should.exist
  })

  it('renders a primary option', () => {
    let element = renderIntoDocument(<ToggleableOptionGroup { ...props } />)
    findByClass(element, 'ToggleableOptionGroup__PrimaryOption')
  })

  it('executes onChange callback on secondary options to match primary option changes', () => {
    let element = renderIntoDocument(<ToggleableOptionGroup { ...props } />)
    let input = scryByClass(element, 'ToggleableOption__hiddenInput')[0]
    input.getDOMNode().checked.should.be.false
    Simulate.change(input, { target: { checked: true }})
    props.onChange.should.have.callCount(2)
    _.forEach(props.options, (d, k) => !d.value && props.onChange.should.have.been.calledWith(k, true))
  })

  it('renders a singular option as the primary option', () => {
    let singleOption = { test_singular: { label: 'Test Singular Option', value: true }}
    let element = renderIntoDocument(<ToggleableOptionGroup { ...props } options={ singleOption }/>)
    let text = ReactDOM.findDOMNode(element).textContent
    text.should.not.contain(props.label)
    text.should.contain(singleOption.test_singular.label)
    text.should.not.contain(props.options.test_one.label)
  })
})
