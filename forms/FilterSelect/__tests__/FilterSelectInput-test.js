'use strict'

import FilterSelect from '../'

describe('FilterSelect', () => {
  describe('initialisation', () => {
    it('sets state.filteredOptions to props.options', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' }
      ]
      let subject = renderIntoDocument(
        <FilterSelect options={ options } />
      ).state.filteredOptions

      expect(subject).to.eql(options)
    })

    it('renders a TextInput for displaying the selected option', () => {
      let subject = renderIntoDocument(
        <FilterSelect options={ [] } />
      ).refs.displayInput

      expect(subject).to.be.ok
    })
  })

  describe('#openOptionList', () => {
    it('sets state.isOpen to true', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      element.openOptionList()
      let subject = element.state.isOpen

      expect(subject).to.eq(true)
    })

    it('renders an OptionList for displaying / selecting filtered options', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      element.openOptionList()
      let subject = element.refs.optionList

      expect(subject).to.be.ok
    })
  })

  describe('#handleOptionListBlur', () => {
    it('sets state.focused and state.isOpen to false', () => {
      const element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      element.openOptionList()
      expect(element.state.isOpen).to.eq(true)

      element.handleOptionListBlur()
      expect(element.state.isOpen).to.eq(false)
    })
  })

  describe('the display select', () => {
    it('sets state.focused to true on focus', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      let input = element.refs.displayInput.getDOMNode()
      Simulate.focus(input)
      let subject = element.state.focused

      expect(subject).to.eq(true)
    })

    it('sets state.isOpen to true on click', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      let input = element.refs.displayInput.getDOMNode()
      Simulate.click(input)
      let subject = element.state.isOpen

      expect(subject).to.eq(true)
    })

    context('when the input has focus', () => {
      describe('hitting the down arrow', () => {
        it('opens the optionList', () => {
          let element = renderIntoDocument(
            <FilterSelect options={ [] } />
          )
          let input = element.refs.displayInput.getDOMNode()
          Simulate.focus(input)
          Simulate.keyDown(input, { keyCode: 40 })

          let subject = element.state.isOpen

          expect(subject).to.eq(true)
        })
      })
    })
  })

  describe('the filter TextInput', () => {
    it('filters the options on change', () => {
      let options = [
        { value: '1', label: 'Tim Rogers' },
        { value: '2', label: 'Tex Perkins' },
        { value: '3', label: 'Ben Ely' }
      ]
      let element = renderIntoDocument(
        <FilterSelect options={ options } />
      )
      element.openOptionList()

      let input = element.refs.filter.refs.filterInput.refs.input.getDOMNode()
      Simulate.change(input, { target: { value: 'Per' }})

      let subject = element.state.filteredOptions

      expect(subject).to.eql([
        { value: '2', label: 'Tex Perkins' }
      ])
    })

    context('when the value is empty', () => {
      it('resets the filter to show all options', () => {
        let options = [
          { value: '1', label: 'Tim Rogers' },
          { value: '2', label: 'Tex Perkins' },
          { value: '3', label: 'Ben Ely' }
        ]
        let element = renderIntoDocument(
          <FilterSelect options={ options } />
        )
        element.openOptionList()

        let input = element.refs.filter.refs.filterInput.refs.input.getDOMNode()
        Simulate.change(input, { target: { value: 'Per' }})
        Simulate.change(input, { target: { value: '' }})

        let subject = element.state.filteredOptions

        expect(subject).to.eql(options)
      })
    })
  })
})
