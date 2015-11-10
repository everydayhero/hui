'use strict'

import OptionList from '../'

describe('OptionList', () => {
  describe('initialisation', () => {
    it('renders an Option element for each option in props.options', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' }
      ]
      let element = renderIntoDocument(<OptionList options={ options } />)
      let subject = scryByTag(element, 'label').map(e => e.props.children)

      expect(subject[0].props.label).to.eq('Tim')
      expect(subject[1].props.label).to.eq('Tex')
    })

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
        let options = [
          { value: '1', label: 'Tim Rogers' }
        ]
        let element = element = renderIntoDocument(
          <OptionList
            options={ options }
            Display={ MyCrazyDisplay }/>
        )
        let subject = findByType(element, MyCrazyDisplay)
          .getDOMNode()
          .innerHTML

        expect(subject).to.eq('sregoR miT')
      })
    })
  })

  describe('key handlers', () => {
    context('when the down arrow (40) is pressed', () => {
      context('and the current selection candidate\'s isn\'t the last item in the list', () => {
        it('sets the next item in the list to the selection candidate', () => {
          let options = [
            { value: '1', label: 'Tim' },
            { value: '2', label: 'Tex' },
            { value: '3', label: 'Ben' }
          ]
          let element = renderIntoDocument(<OptionList options={ options } />)
          let item    = element.refs['option-list-item-0']
          let radio   = item.refs.radio
          Simulate.keyDown(radio.getDOMNode(), { keyCode: 40 })

          expect(element.state.selectionCandidate).to.eql({ value: '2', label: 'Tex' })
        })
      })
      context('and the current selection candidate\'s is the last item in the list', () => {
        it('sets the first item in the list to the selection candidate', () => {
          let options = [
            { value: '1', label: 'Tim' },
            { value: '2', label: 'Tex' },
            { value: '3', label: 'Ben' }
          ]
          let element = renderIntoDocument(<OptionList options={ options } />)
          let item    = element.refs['option-list-item-2']
          let radio   = item.refs.radio
          element.setState({
            selectionCandidate: options[2]
          })
          Simulate.keyDown(radio.getDOMNode(), { keyCode: 40 })

          expect(element.state.selectionCandidate).to.eql({ value: '1', label: 'Tim' })
        })
      })
    })
    context('when the up arrow (38) is pressed', () => {
      context('and the current selection candidate\'s isn\'t the first item in the list', () => {
        it('sets the previous item in the list to the selection candidate', () => {
          let options = [
            { value: '1', label: 'Tim' },
            { value: '2', label: 'Tex' },
            { value: '3', label: 'Ben' }
          ]
          let element = renderIntoDocument(<OptionList options={ options } />)
          let item    = element.refs['option-list-item-2']
          let radio   = item.refs.radio
          element.setState({
            selectionCandidate: options[2]
          })
          Simulate.keyDown(radio.getDOMNode(), { keyCode: 38 })

          expect(element.state.selectionCandidate).to.eql({ value: '2', label: 'Tex' })
        })
      })
      context('and the current selection candidate\'s is the first item in the list', () => {
        it('sets the last item in the list to the selection candidate', () => {
          let options = [
            { value: '1', label: 'Tim' },
            { value: '2', label: 'Tex' },
            { value: '3', label: 'Ben' }
          ]
          let element = renderIntoDocument(<OptionList options={ options } />)
          let item    = element.refs['option-list-item-0']
          let radio   = item.refs.radio
          Simulate.keyDown(radio.getDOMNode(), { keyCode: 38 })

          expect(element.state.selectionCandidate).to.eql({ value: '3', label: 'Ben' })
        })
      })
    })
    context('when the enter key is pressed', () => {
      it('sets state.selected to the candidateOption', () => {
        let options = [
          { value: '1', label: 'Tim' },
          { value: '2', label: 'Tex' },
          { value: '3', label: 'Ben' }
        ]
        let element = renderIntoDocument(<OptionList options={ options } />)
        let item0   = element.refs['option-list-item-0']
        let radio0  = item0.refs.radio
        Simulate.keyDown(radio0.getDOMNode(), { keyCode: 13 })

        expect(element.state.selected).to.eql({ value: '1', label: 'Tim' })

        element.setState({
          selectionCandidate: options[2]
        })
        let item2   = element.refs['option-list-item-2']
        let radio2  = item2.refs.radio
        Simulate.keyDown(radio2.getDOMNode(), { keyCode: 13 })

        expect(element.state.selected).to.eql({ value: '3', label: 'Ben' })
      })
    })
  })

  describe('hoving over an option', () => {
    it('sets state.selectionCandidate to the hovered option', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' },
        { value: '3', label: 'Ben' }
      ]
      let element = renderIntoDocument(<OptionList options={ options } />)
      let option = scryByTag(element, 'label')[1]

      TestUtils.SimulateNative.mouseOver(option.getDOMNode())
      expect(element.state.selectionCandidate).to.eql(options[1])
    })
  })

  describe('selecting an option', () => {
    it('sets state.selected to the selected option', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' },
        { value: '3', label: 'Ben' }
      ]
      let element = renderIntoDocument(<OptionList options={ options } />)
      let item    = element.refs['option-list-item-1']
      let radio   = item.refs.radio

      let mockEvent = {
        target: {
          checked: true
        }
      }

      Simulate.change(radio.getDOMNode(), mockEvent)
      expect(element.state.selected).to.eql(options[1])
    })
  })

  describe('#focus', () => {
    it('focuses the radio belonging to the candidate option', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' },
        { value: '3', label: 'Ben' }
      ]
      let element = renderIntoDocument(<OptionList options={ options } />)
      element.setState({
        selectionCandidate: options[1]
      })
      let item  = element.refs['option-list-item-1']
      let radio = item.refs.radio.getDOMNode()
      sinon.spy(radio, 'focus')
      element.focus()

      expect(radio.focus).to.be.called
    })
  })
})
