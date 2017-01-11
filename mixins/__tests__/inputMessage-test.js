import React from 'react'
import { shallow } from 'enzyme'
import inputMessage from '../inputMessage'

const MockComponent = React.createClass({
  mixins: [inputMessage],
  render () {
    return <div>foo</div>
  }
})

describe('inputMessage', () => {
  it('only shows errors if hasError state is true', () => {
    const wrapper = shallow(<MockComponent showError={false} />)
    wrapper.setState({ hasError: true })

    expect(wrapper.instance().shouldShowError()).to.equal(true)
  })

  it('shows errors if showError prop is true and there are errors to show', () => {
    const wrapper = shallow(<MockComponent showError={false} />)

    wrapper.setState({ hasError: false })
    expect(wrapper.instance().shouldShowError()).to.equal(false)
    wrapper.setProps({ errors: ['foo', 'bar'] })
    expect(wrapper.instance().shouldShowError()).to.equal(false)
    wrapper.setProps({ showError: true })
    expect(wrapper.instance().shouldShowError()).to.equal(true)
  })
})
