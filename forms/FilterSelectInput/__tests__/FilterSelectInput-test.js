'use strict';

import FilterSelectInput from '../'

describe('FilterSelectInput', () => {
  describe('initialisation', () => {
    it('sets state.filteredOptions to props.options', () => {
      let options = [
        { value: '1', label: 'Tim' },
        { value: '2', label: 'Tex' }
      ]
      let subject = renderIntoDocument(
        <FilterSelectInput options={ options } />
      ).state.filteredOptions

      expect(subject).to.eql(options)
    })

    it('renders a TextInput for filtering', () => {
      let subject = renderIntoDocument(
        <FilterSelectInput options={ [] } />
      ).refs.textInput

      expect(subject).to.be.ok
    })

    it('renders an OptionList for displaying / selecting filtered options', () => {
      let subject = renderIntoDocument(
        <FilterSelectInput options={ [] } />
      ).refs.optionList

      expect(subject).to.be.ok
    })
  })

  describe('#filter', () => {
    context('when no property array has been passed', () => {
      it('fuzzy matches the `label` propery of each props.options to the value of refs.textInput', () => {
        let options = [
          { value: '1', label: 'Tim Rogers' },
          { value: '2', label: 'Tex Perkins' },
          { value: '3', label: 'Ben Ely' }
        ]
        let element = renderIntoDocument(
          <FilterSelectInput options={ options } />
        )

        element.filter('t r')
        let subject = element.state.filteredOptions

        expect(subject).to.eql([
          { value: '1', label: 'Tim Rogers' },
          { value: '2', label: 'Tex Perkins' }
        ])
      })
    })

    context('when a property array has been passed', () => {
      it('matches on those specified properties', () => {
        let options = [
          { value: '1', label: 'Tim Rogers' },
          { value: '2', label: 'Tex Perkins' },
          { value: 'G', label: 'Ben Ely' }
        ]
        let element = renderIntoDocument(
          <FilterSelectInput
            options={ options }
            properties={ ['value', 'label'] } />
        )

        element.filter('G')
        let subject = element.state.filteredOptions

        expect(subject).to.eql([
          { value: '1', label: 'Tim Rogers' },
          { value: 'G', label: 'Ben Ely' }
        ])
      })
    })
  })

  describe('the TextInput', () => {
    it('calls #filter on change', () => {
      let options = [
        { value: '1', label: 'Tim Rogers' },
        { value: '2', label: 'Tex Perkins' },
        { value: '3', label: 'Ben Ely' }
      ]
      let element = renderIntoDocument(
        <FilterSelectInput options={ options } />
      )

      let input = element.refs.textInput.refs.input.getDOMNode()
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
          <FilterSelectInput options={ options } />
        )

        let input = element.refs.textInput.refs.input.getDOMNode()
        Simulate.change(input, { target: { value: 'Per' }})
        Simulate.change(input, { target: { value: '' }})

        let subject = element.state.filteredOptions

        expect(subject).to.eql(options)
      })
    })
  })
})
