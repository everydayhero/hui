'use strict'

import Wizard from '../index'

describe('Wizard', function () {
  describe('default', function () {
    var component

    it('should render Wizard', function () {
      component = renderIntoDocument(<Wizard />)

      component.should.exist
    })

    it('should render one step', function () {
      component = renderIntoDocument(<Wizard><div className='step_one' /></Wizard>)

      findByClass(component, 'step_one')
    })

    it('should render one step when passed multiple', function () {
      component = renderIntoDocument(<Wizard><div className='step_one' /><div className='step_two' /></Wizard>)

      findByClass(component, 'step_one')
    })
  })
})
