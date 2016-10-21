'use strict'

import DeltaArrow from '../'

describe('DeltaArrow', function () {
  describe('with positive number', function () {
    var component, node

    beforeEach(function () {
      component = renderIntoDocument(<DeltaArrow delta={0.1234} />)
    })

    it('should have appropriate class', function () {
      findByClass(component, 'hui-DeltaArrow--up')
    })

    it('should render formatted percentage', function () {
      node = findByClass(component, 'hui-DeltaArrow__value')
      node.textContent.should.equal('12%')
    })
  })

  describe('with negative number', function () {
    var component, node

    beforeEach(function () {
      component = renderIntoDocument(<DeltaArrow delta={-0.5} />)
    })

    it('should have appropriate class', function () {
      findByClass(component, 'hui-DeltaArrow--down')
    })

    it('should render formatted percentage', function () {
      node = findByClass(component, 'hui-DeltaArrow__value')
      node.textContent.should.equal('50%')
    })
  })

  describe('numbers over 999%', function () {
    var component, node

    beforeEach(function () {
      component = renderIntoDocument(<DeltaArrow delta={11.3} />)
    })

    it('should render formatted percentage with one signicant number', function () {
      node = findByClass(component, 'hui-DeltaArrow__value')
      node.textContent.should.equal('1k%')
    })
  })

  describe('with loading', function () {
    var component, node

    beforeEach(function () {
      component = renderIntoDocument(<DeltaArrow delta={-0.5} loading />)
    })

    it('should have appropriate class', function () {
      findByClass(component, 'hui-DeltaArrow--loading')
    })

    it('should render formatted percentage', function () {
      node = findByClass(component, 'hui-DeltaArrow__value')
      node.textContent.should.equal('')
    })
  })

  describe('with emptyState', function () {
    var component, node

    beforeEach(function () {
      component = renderIntoDocument(<DeltaArrow delta={-0.5} emptyState />)
    })

    it('should have appropriate class', function () {
      findByClass(component, 'hui-DeltaArrow--emptyState')
    })

    it('should render formatted percentage', function () {
      node = findByClass(component, 'hui-DeltaArrow__value')
      node.textContent.should.equal('')
    })
  })
})
