'use strict'

import Tabs from '../index'

describe('Tabs', function() {

  describe('default', function() {
    let tabs
    let activeId = 0
    let tabItems = [
      {
        label: 'Raise',
        content: <p>Amount raised goes here</p>
      },
      {
        label: 'Distance',
        content: <p>Distance goes here</p>
      },
      {
        label: 'Elevation',
        content: <p>Elevation goes here</p>
      }
    ]

    let onChange = sinon.spy()

    beforeEach(function() {
      onChange.reset()
      tabs = renderIntoDocument(<Tabs tabs={ tabItems } active={ activeId } onChange={ onChange }/>)
    })

    it('should render Tabs', function() {
      let tabLinks = scryByClass(tabs, 'hui-Tabs__tab')

      expect(tabLinks.length).to.equal(3)
    })

    it('should render Content', function() {
      let content = findByClass(tabs, 'hui-Tabs_content')

      expect(content.getDOMNode().textContent).to.contain('Amount raised goes here')
    })

    it('should select a tab', function() {
      let tabLinks = scryByClass(tabs, 'hui-Tabs__tab')
      Simulate.click(tabLinks[2].getDOMNode())

      onChange.should.have.been.calledWith(2)
    })

    it('should default to a tab', function() {
      tabs = renderIntoDocument(<Tabs tabs={ tabItems } active={ 2 }/>)
      let content = findByClass(tabs, 'hui-Tabs__tab--active')

      expect(content.getDOMNode().textContent).to.contain(tabItems[2].label)
    })
  })
})
