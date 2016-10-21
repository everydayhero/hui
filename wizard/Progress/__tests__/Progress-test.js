'use strict'

import Progress from '../index'

describe('Progress', function () {
  describe('default', function () {
    var component

    beforeEach(function () {
      component = renderIntoDocument(<Progress total={1} />)
    })

    it('should render Progress', function () {
      component = renderIntoDocument(<Progress total={4} />)

      component.should.exist
    })

    it('should render for items', function () {
      component = renderIntoDocument(<Progress total={4} />)
      var items = scryByClass(component, 'hui-Progress__item')

      expect(items.length).to.equal(4)
    })

    it('should mark a active item', function () {
      component = renderIntoDocument(<Progress total={4} active={2} />)
      var items = scryByClass(component, 'hui-Progress__item')

      expect(items[2].className).to.contain('hui-Progress__item--active')
    })

    it('should return the index clicked', function () {
      var itemClicked = false
      var onChange = function (index) {
        itemClicked = index
      }
      component = renderIntoDocument(<Progress total={4} active={2} onChange={onChange} />)
      var items = scryByClass(component, 'hui-Progress__item')

      Simulate.click(items[2])

      itemClicked.should.equal(2)
    })
  })
})
