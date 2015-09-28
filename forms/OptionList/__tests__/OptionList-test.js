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

    context('when an `Option` React class has been passed', () => {
      it('uses that class to render option elements', () => {
        let MyCrazyOption = React.createClass({
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
            Option={ MyCrazyOption }/>
        )
        let subject = findByType(element, MyCrazyOption)
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
          let radios  = scryByTag(element, 'input')
          Simulate.keyDown(radios[0].getDOMNode(), { keyCode: 40 })

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
          let radios  = scryByTag(element, 'input')
          element.setState({
            selectionCandidate: options[2]
          })
          Simulate.keyDown(radios[2].getDOMNode(), { keyCode: 40 })

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
          let radios  = scryByTag(element, 'input')
          element.setState({
            selectionCandidate: options[2]
          })
          Simulate.keyDown(radios[2].getDOMNode(), { keyCode: 38 })

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
          let radios  = scryByTag(element, 'input')
          Simulate.keyDown(radios[0].getDOMNode(), { keyCode: 38 })

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
        let radios  = scryByTag(element, 'input')
        Simulate.keyDown(radios[0].getDOMNode(), { keyCode: 13 })

        expect(element.state.selected).to.eql({ value: '1', label: 'Tim' })

        element.setState({
          selectionCandidate: options[2]
        })
        Simulate.keyDown(radios[2].getDOMNode(), { keyCode: 13 })

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
      let option = scryByTag(element, 'li')[1]

      TestUtils.SimulateNative.mouseOver(option.getDOMNode())
      expect(element.state.selectionCandidate).to.eql(options[1])
    })
  })

  describe('clicking an option', () => {
    it('sets state.selected to the clicked option', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' },
        { value: '3', label: 'Ben' }
      ]
      let element = renderIntoDocument(<OptionList options={ options } />)
      let option = scryByTag(element, 'li')[1]

      Simulate.click(option.getDOMNode())
      expect(element.state.selected).to.eql(options[1])
    })
  })
})
