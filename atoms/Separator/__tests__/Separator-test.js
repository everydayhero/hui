'use strict'

import Separator from '../'

describe('Separator', function () {
  var element

  it('defaults to green', function () {
    element = renderIntoDocument(<Separator />)
    findByClass(element, 'green')
  })

  it('can be white', function () {
    var separatorImagePath = 'images/separator_white.png'
    element = renderIntoDocument(<Separator color='white'
      separatorImagePath={separatorImagePath} />)
    findByClass(element, 'white')
  })

  it('can be grey', function () {
    var separatorImagePath = 'images/separator_grey.png'
    element = renderIntoDocument(<Separator color='grey'
      separatorImagePath={separatorImagePath} />)
    findByClass(element, 'grey')
  })
})
