'use strict'

import A from '../'

describe('A', function () {
  var element

  before(function () {
    element = TestUtils.renderIntoDocument(<A href='testurl' className='customClass' />)
  })

  it('renders a link', function () {
    element.should.exist
    var link = findByAttribute(element, 'href', 'testurl')
    link.should.exist
  })

  it('accepts custom classnames', function () {
    var link = findByClass(element, 'customClass')
    link.should.exist
  })

  it('executes an onclick handler', function () {
    var onClick = sinon.spy()
    element = TestUtils.renderIntoDocument(<A href='testurl' className='customClass' onClick={onClick} />)
    var link = findByClass(element, 'hui-A')
    TestUtils.Simulate.click(link)
    onClick.should.have.been.called
  })

  it('has a default onClick handler', function () {
    var link = findByClass(element, 'hui-A')
    expect(function () {
      TestUtils.Simulate.click(link)
    }).to.not.throw()
  })
})
