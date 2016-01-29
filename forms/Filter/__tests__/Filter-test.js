'use strict'

import Filter from '../'

describe('Filter', () => {
  describe('initialisation', () => {
    it('renders a TextInput for displaying the selected option', () => {
      let subject = renderIntoDocument(
        <Filter collection={ [] } />
      ).refs.filterInput

      expect(subject).to.be.ok
    })
  })

  describe('#filter', () => {
    context('when no property array has been passed', () => {
      it('fuzzy matches the `name` propery of each props.options to the value of refs.filterInput', () => {
        let collection = [
          { id: '1', name: 'Tim Rogers' },
          { id: '2', name: 'Tex Perkins' },
          { id: '3', name: 'Ben Ely' }
        ]
        var subject = []
        let handleFilter = (results) => {
          subject = results
        }
        let element = renderIntoDocument(
          <Filter
            collection={ collection }
            onFilter={ handleFilter }/>
        )
        element.filter('t r')

        expect(subject).to.eql([
          { id: '1', name: 'Tim Rogers' },
          { id: '2', name: 'Tex Perkins' }
        ])
      })
    })

    context('when a property array has been passed', () => {
      it('matches on those specified properties', () => {
        let collection = [
          { id: '1', name: 'Tim Rogers' },
          { id: '2', name: 'Tex Perkins' },
          { id: 'G', name: 'Ben Ely' }
        ]
        var subject = []
        let handleFilter = (results) => {
          subject = results
        }
        let element = renderIntoDocument(
          <Filter
            properties={ ['id', 'name'] }
            collection={ collection }
            onFilter={ handleFilter }/>
        )
        element.filter('G')

        expect(subject).to.eql([
          { id: '1', name: 'Tim Rogers' },
          { id: 'G', name: 'Ben Ely' }
        ])
      })

      it('returns a max number of results', () => {
        let collection = [
          { id: '1', name: 'Tim Rogers' },
          { id: '2', name: 'Tex Perkins' },
          { id: 'G', name: 'Ben Ely' }
        ]
        var subject = []
        let handleFilter = (results) => {
          subject = results
        }
        let element = renderIntoDocument(
          <Filter
            properties={ ['id', 'name'] }
            collection={ collection }
            maxResults={ 1 }
            onFilter={ handleFilter }/>
        )
        element.filter('G')

        expect(subject).to.eql([
          { id: '1', name: 'Tim Rogers' }
        ])
      })
    })
  })

  describe('updating the filterInput', () => {
    it('filters the passed collection with the value of the filterInput', () => {
      let collection = [
        { id: '1', name: 'Tim Rogers' },
        { id: '2', name: 'Tex Perkins' },
        { id: 'G', name: 'Ben Ely' }
      ]
      let subject = sinon.spy()
      let element = renderIntoDocument(
        <Filter
          properties={ ['id', 'name'] }
          collection={ collection }
          onFilter={ subject }/>
      )
      let input = findByTag(element, 'input');
      Simulate.change(input, { target: { value: 'Tex Perkins' }})
      expect(subject).to.be.calledWith([
        { id: '2', name: 'Tex Perkins' }
      ])
    })
  })
})
