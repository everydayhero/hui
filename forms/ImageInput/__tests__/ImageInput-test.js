'use strict'

import ImageInput from '../'

describe('Image Input', function () {
  var component

  describe('image', function () {
    it('should render image when it is present', function () {
      var image = { url: 'url', filename: 'file name' }
      component = renderIntoDocument(<ImageInput value={image} />)
      findByClass(component, 'hui-ImageInput__img')
    })

    it('should not render image when it is absent', function () {
      var image = { url: null, filename: null }
      component = renderIntoDocument(<ImageInput value={image} />)
      var images = scryByClass(component, 'hui-ImageInput__img')

      images.length.should.equal(0)
    })
  })
})
