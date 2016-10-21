'use strict'

import Masthead from '../index'

describe('Masthead', () => {
  let component

  describe('default', () => {
    beforeEach(() => {
      document.implementation.hasFeature = () => true
      component = renderIntoDocument(<Masthead imagePath='/' href='foo' />)
    })

    it('should render Masthead', () => {
      component.should.exist
    })

    it('should not render application name', () => {
      scryByClass(component, 'hui-Masthead__appName').length.should.equal(0)
    })

    it('should render a anchor with href foo', () => {
      let href = findByTag(component, 'a').href

      href.should.contain('foo')
    })
  })

  describe('application Name', () => {
    beforeEach(() => {
      component = renderIntoDocument(<Masthead appName='foo' imagePath='/' />)
    })

    it('should render application name', () => {
      scryByClass(component, 'hui-Masthead__appName').length.should.equal(1)
    })
  })

  describe('image', () => {
    let img

    describe('with imagePath', () => {
      beforeEach(() => {
        component = renderIntoDocument(<Masthead imagePath='/' />)
      })

      it('should render an image with src of imagePath', () => {
        img = findByClass(component, 'hui-Masthead__logo--desktop')

        img.src.should.contain('hui_edh_logo@x2.gif')
      })
    })

    describe('with desktopLogo', () => {
      beforeEach(() => {
        component = renderIntoDocument(<Masthead desktopLogo='foo/bar.jpg' />)
      })

      it('should render an image with src of desktopLogo', () => {
        img = findByClass(component, 'hui-Masthead__logo--desktop')

        img.src.should.contain('foo/bar.jpg')
      })
    })
  })
})
