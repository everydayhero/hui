'use strict'

import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'

import CopyInput from '../'

describe('CopyInput', () => {
  let element, input, button

  beforeEach(() => {
    element = mount(
      <CopyInput
        value='foobar'
        name='underTest'
        id='baz'
        copyError='fail message'
      />
    )
    input = element.find('input[name="underTest"]')
    button = element.find('.hui-CopyInput__button')

    sinon.stub(document, 'execCommand')
  })

  afterEach(() => {
    document.execCommand.restore()
  })

  it('renders a text field with a given value', () => {
    input.prop('value').should.equal('foobar')
  })

  it('renders copy button', () => {
    button.is('button').should.be.true
  })

  it('focuses the text input when the copy button is clicked', () => {
    button.simulate('click')
    const inputName = input.prop('name')
    const activeElementName = document.activeElement.name
    activeElementName.should.equal(inputName)
  })

  it('renders a default text label on the copy button', () => {
    button.text().should.contain('Copy')
  })

  it('renders a different text label on the copy button if text has been copied', () => {
    button.simulate('click')
    button.text().should.contain('Copied')
  })

  it('shows an error message if a copy failed', () => {
    document.execCommand.throws('Copying disabled')
    button.simulate('click')
    element.text().should.contain('fail message')
  })
})
