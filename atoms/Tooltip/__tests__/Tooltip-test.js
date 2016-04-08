'use strict'

import Tooltip from '../'
let tipText = 'This is some test tooltip text.'

describe('Tooltip', () => {
  let element

  it('renders', () => {
    element = renderIntoDocument(<Tooltip text={ tipText }/>)
    findDOMNode(element).textContent.should.equal(tipText)
  })

  it('can be opened and closed', () => {
    element = renderIntoDocument(<Tooltip text={ tipText } />)
    let tip = findByClass(element, 'Tooltip')
    Simulate.click(tip)
    element.state.open.should.equal(true)

    let click = document.createEvent('HTMLEvents')
    click.initEvent('click', true, true)
    document.dispatchEvent(click)

    element.state.open.should.equal(false)
  })

  it('can be placed on the right', () => {
    element = renderIntoDocument(<Tooltip text={ tipText } side="right" />)
    findByClass(element, 'Tooltip__tip--right')
  })
})
