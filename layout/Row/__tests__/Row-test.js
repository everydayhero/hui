'use strict'

import Row from '../'

describe('Row', function () {
  it('renders', function () {
    var element = TestUtils.renderIntoDocument(<Row />)
    element.should.exist
  })

  it('tracks device width', function () {
    var element = TestUtils.renderIntoDocument(<Row />)
    var tv = findByClass(element, 'tv')
    tv.should.exist
  })

  it('renders as banner', function () {
    var element = TestUtils.renderIntoDocument(<Row level='banner' />)
    var banner = findByClass(element, 'banner')
    banner.should.exist
  })

  it('renders as primary', function () {
    var element = TestUtils.renderIntoDocument(<Row level='primary' />)
    var primary = findByClass(element, 'primary')
    primary.should.exist
  })

  it('renders as secondary', function () {
    var element = TestUtils.renderIntoDocument(<Row level='secondary' />)
    var secondary = findByClass(element, 'secondary')
    secondary.should.exist
  })

  it('accepts custom classes', function () {
    var element = TestUtils.renderIntoDocument(<Row className='testClass' />)
    var testClass = findByClass(element, 'testClass')
    testClass.should.exist
  })
})
