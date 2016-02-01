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

    it('sets state.shouldScroll to false', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' },
        { value: '3', label: 'Ben' }
      ]
      let element = renderIntoDocument(<OptionList options={ options } />)
      let option = scryByTag(element, 'label')[1]

      TestUtils.SimulateNative.mouseOver(option.getDOMNode())
      expect(element.state.shouldScroll).to.eql(false)
    })
  })

  describe('selecting an option (the selection is made by a user action in the component)', () => {
    it('sets state.selected to the selected option and state.shouldScroll to false', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' },
        { value: '3', label: 'Ben' }
      ]
      let element = renderIntoDocument(<OptionList options={ options } />)
      let item    = element.refs['option-list-item-1']
      let label   = item.refs.label

      Simulate.mouseDown(label.getDOMNode())
      expect(element.state.selected).to.eql(options[1])
      expect(element.state.shouldScroll).to.eql(false)
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
        selectionCandidate: options[1],
        focused: true
      })
      let item = element.refs['option-list-item-1']
      element.focus()

      expect(document.activeElement).to.eql(item.refs.radio.getDOMNode())
    })
  })

  describe('props.selectedOption', () => {
    let options = [
      { value: '1', label: 'Tim' },
      { value: '2', label: 'Tex' },
      { value: '3', label: 'Ben' }
    ]
    let Parent = React.createClass({
      displayName: 'Parent',
      getInitialState () {
        return {
          selected: options[0]
        }
      },
      render () {
        return (
          <OptionList
            ref="optionList"
            options={ options }
            selectedOption={ this.state.selected }/>
        )
      }
    })

    context('when props.selectedOption is not null (the selection is made from props)', () => {
      it('sets state.selected to the passed prop and state.shouldScroll to true', () => {
        let element = renderIntoDocument(<Parent />)
        expect(element.refs.optionList.state.selected.label).to.eq('Tim')

        element.setState({
          selected: {
            value: '2', label: 'Tex'
          }
        })
        expect(element.refs.optionList.state.selected.label).to.eq('Tex')
        expect(element.refs.optionList.state.shouldScroll).to.eq(true)
      })
    })

    context('when props.selectedOption is null', () => {
      it('sets state.selected to null, clearing the current selection', () => {
        let element = renderIntoDocument(<Parent />)
        expect(element.refs.optionList.state.selected.label).to.eq('Tim')

        element.setState({
          selected: null
        })
        expect(element.refs.optionList.state.selected).to.eq(null)
      })
    })
  })
})
