'use strict'

import CopyInput from '../'

describe('CopyInput', () => {
  let element, input, button

  beforeEach(() => {
    element = renderIntoDocument(<CopyInput value="foobar" name="underTest" id="baz" />)
    input   = findByAttribute(element, 'name', 'underTest')
    button  = findByClass(element, 'hui-CopyInput__button')
  })

  it('renders a text field with a given value', () => {
    input.value.should.equal('foobar')
  })

  it('renders copy button', () => {
    button.tagName.should.equal('BUTTON')
  })

  it('focuses the text input when the copy button is clicked', () => {
    Simulate.click(button)
    document.activeElement.should.equal(input)
  })

  it('renders a default text label on the copy button', () => {
    button.textContent.should.contain('Copy')
  })

  it('renders a different text label on the copy button if text has been copied', () => {
    element.setState({ copied: true })
    button.textContent.should.contain('Copied')
  })

  it('shows an error message if a copy failed', () => {
    element.setState({ errors: ['fail message'] })
    element.getDOMNode().textContent.should.contain('fail message')
  })
})
