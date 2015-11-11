'use strict'

import Item from '../'

describe('Item', () => {
  context('when a `Display` React class has been passed', () => {
    it('uses that class to render option elements', () => {
      let MyCrazyDisplay = React.createClass({
        displayName: 'Craaaazy',
        render () {
          return (
            <div>{ this.props.label.split('').reverse().join('') }</div>
          )
        }
      })
      let option = { value: '1', label: 'Tim Rogers' }
      let element = element = renderIntoDocument(
        <Item
          option={ option }
          Display={ MyCrazyDisplay }/>
      )
      let subject = findByType(element, MyCrazyDisplay)
        .getDOMNode()
        .innerHTML

      expect(subject).to.eq('sregoR miT')
    })
  })
})
