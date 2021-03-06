'use strict'

import ToolTip from '../'

describe('ToolTip', function () {
  var data = { date: '2015-02-26', value: 123, total: 456 }

  describe('default', function () {
    var component

    beforeEach(function () {
      component = renderIntoDocument(<ToolTip />)
    })

    it('should not render ToolTip', function () {
      scryByClass(component, 'hui-ToolTip').length.should.equal(0)
    })
  })

  describe('display', function () {
    var component

    beforeEach(function () {
      component = renderIntoDocument(<ToolTip data={data} show />)
    })

    it('should render ToolTip', function () {
      scryByClass(component, 'hui-ToolTip').length.should.equal(1)
    })

    it('should not flip over the tooltip', function () {
      scryByClass(component, 'hui-ToolTip--left').length.should.equal(0)
    })

    it('should render the line on the left', function () {
      scryByClass(component, 'hui-ToolTip__text--left').length.should.equal(1)
    })

    it('should render the value', function () {
      scryByClass(component, 'hui-ToolTip__value').length.should.equal(1)
    })
  })

  describe('date', function () {
    it('should render the date', function () {
      var component = renderIntoDocument(<ToolTip data={data} show />)
      scryByClass(component, 'hui-ToolTip__date').length.should.equal(1)
    })

    it('should not render the date', function () {
      var component = renderIntoDocument(<ToolTip data={data} show showDate={false} />)
      scryByClass(component, 'hui-ToolTip__date').length.should.equal(0)
    })
  })

  describe('total', function () {
    it('should render the total', function () {
      var component = renderIntoDocument(<ToolTip data={data} show />)
      scryByClass(component, 'hui-ToolTip__total').length.should.equal(1)
    })

    it('should not render the total', function () {
      var component = renderIntoDocument(<ToolTip data={data} show showTotal={false} />)
      scryByClass(component, 'hui-ToolTip__total').length.should.equal(0)
    })
  })

  describe('formated', function () {
    var component

    beforeEach(function () {
      component = renderIntoDocument(<ToolTip data={data} show totalFormat={'0.00a'} />)
    })

    it('should render the total formated', function () {
      findByClass(component, 'hui-ToolTip__total').textContent.should.contain('456.00')
    })
  })

  describe('flip over behaviour', function () {
    var component

    beforeEach(function () {
      component = renderIntoDocument(<ToolTip data={data} show isFlipOver />)
    })

    it('should flip over the tooltip', function () {
      scryByClass(component, 'hui-ToolTip--left').length.should.equal(1)
    })

    it('should render the line on the right', function () {
      scryByClass(component, 'hui-ToolTip__text--right').length.should.equal(1)
    })
  })
})
