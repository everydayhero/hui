'use strict'

import Item from '../'
import ReactDOM from 'react-dom'

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
      let subject = ReactDOM.findDOMNode(
        findByType(element, MyCrazyDisplay)
      ).textContent

      expect(subject).to.eq('sregoR miT')
    })
  })
})
