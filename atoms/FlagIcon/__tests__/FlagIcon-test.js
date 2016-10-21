'use strict'

import FlagIcon from '../'

describe('FlagIcon', function () {
  it('renders a flag icon', function () {
    var element = renderIntoDocument(<FlagIcon country='AU' />)
    var icon = findByClass(element, 'hui-Flag')
    expect(icon.className).to.eq('hui-Flag hui-Flag-au')
  })
})
