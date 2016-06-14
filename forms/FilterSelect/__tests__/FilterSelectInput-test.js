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

    it('renders a Select for displaying the selected option', () => {
      let subject = renderIntoDocument(
        <FilterSelect options={ [] } />
      ).refs.displayInput

      expect(subject).to.be.ok
    })
  })

  describe('props.value', () => {
    context('when `null`', () => {
      it('will guard aginst a null value and still render', () => {
        let subject = renderIntoDocument(
          <FilterSelect value={ null }  options={ [] } />
        )
        expect(subject).to.be.ok
      })
    })
  })

  describe('available options', () => {
    it('limits options passed to the option list to < props.maxResults', () => {
      let collection = [
        { id: '1', name: 'Tim Rogers' },
        { id: '2', name: 'Tex Perkins' },
        { id: 'G', name: 'Ben Ely' }
      ]
      let element = renderIntoDocument(
        <FilterSelect
          options={ collection }
          maxResults={ 1 } />
      )
      let subject = element.state.filteredOptions

      expect(subject).to.eql([
        { id: '1', name: 'Tim Rogers' }
      ])
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

  describe('#closeOptionList', () => {
    it('sets state.isOpen to false', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      element.closeOptionList()
      let subject = element.state.isOpen

      expect(subject).to.eq(false)
    })

    it('doesn\'t render an OptionList', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      element.closeOptionList()
      let subject = element.refs.optionList

      expect(subject).to.not.be.ok
    })
  })

  describe('the display select', () => {
    it('sets state.focused to true on focus', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      let input = element.refs.displayInput.refs.input
      Simulate.focus(input)
      let subject = element.state.focused

      expect(subject).to.eq(true)
    })

    it('sets state.isOpen to true on click', () => {
      let element = renderIntoDocument(
        <FilterSelect options={ [] } />
      )
      let input = element.refs.displayInput.refs.input
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
          let input = element.refs.displayInput.refs.input
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

      let input = element.refs.filter.refs.filterInput.refs.input
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

        let input = element.refs.filter.refs.filterInput.refs.input
        Simulate.change(input, { target: { value: 'Per' }})
        Simulate.change(input, { target: { value: '' }})

        let subject = element.state.filteredOptions

        expect(subject).to.eql(options)
      })
    })

    context('alphabetical', () => {
      it('lists options alphabetically asc', () => {
        let options = [
          { value: '1', label: 'Zim Rogers' },
          { value: '2', label: 'Kex Perkins' },
          { value: '3', label: 'Ben Ely' }
        ]
        let subject = renderIntoDocument(
          <FilterSelect options={ options } sort={ 'asc' } />
        ).state.filteredOptions

        expect(subject).to.eql([
          { value: '3', label: 'Ben Ely' },
          { value: '2', label: 'Kex Perkins' },
          { value: '1', label: 'Zim Rogers' }
        ])
      })

      it('lists options alphabetically desc', () => {
        let options = [
          { value: '2', label: 'Kex Perkins' },
          { value: '3', label: 'Ben Ely' },
          { value: '1', label: 'Zim Rogers' }
        ]
        let subject = renderIntoDocument(
          <FilterSelect options={ options } sort={ 'desc' } />
        ).state.filteredOptions

        expect(subject).to.eql([
          { value: '1', label: 'Zim Rogers' },
          { value: '2', label: 'Kex Perkins' },
          { value: '3', label: 'Ben Ely' }
        ])
      })

      it('lists options alphabetically asc with alternate labelKey', () => {
        let options = [
          { value: 'Zim Rogers' },
          { value: 'Kex Perkins' },
          { value: 'Ben Ely' }
        ]
        let subject = renderIntoDocument(
          <FilterSelect options={ options } sort={ 'asc' } labelKey={ 'value' } />
        ).state.filteredOptions

        expect(subject).to.eql([
          { value: 'Ben Ely' },
          { value: 'Kex Perkins' },
          { value: 'Zim Rogers' }
        ])
      })
    })
  })
})
