'use strict'

import Pagination from '../index'

describe('Pagination', function () {
  describe('default', function () {
    let onChange = sinon.spy()

    beforeEach(function () {
      onChange.reset()
    })

    it('should disable the page down button', function () {
      let pagination = renderIntoDocument(<Pagination currentPage={0} count={3} onChange={onChange} />)
      let buttons = scryByClass(pagination, 'hui-Pagination__pager')

      expect(buttons[0].className).to.contain('hui-Pagination__pager--disabled')
    })

    it('should disable the page up button', function () {
      let pagination = renderIntoDocument(<Pagination currentPage={2} count={3} onChange={onChange} />)
      let buttons = scryByClass(pagination, 'hui-Pagination__pager')

      expect(buttons[1].className).to.contain('hui-Pagination__pager--disabled')
    })

    it('should call onChange with positive one on pageUp', function () {
      let pagination = renderIntoDocument(<Pagination currentPage={0} count={3} onChange={onChange} />)
      let buttons = scryByClass(pagination, 'hui-Pagination__pager')

      Simulate.click(buttons[1])

      onChange.should.have.been.calledWith(1)
    })

    it('should call onChange with positive one on pageDown', function () {
      let pagination = renderIntoDocument(<Pagination currentPage={1} count={3} onChange={onChange} />)
      let buttons = scryByClass(pagination, 'hui-Pagination__pager')

      Simulate.click(buttons[0])

      onChange.should.have.been.calledWith(-1)
    })
  })
})
