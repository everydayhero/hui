'use strict'

import { mount } from 'enzyme'
import { expect } from 'chai'
import filepicker from '../../../lib/filepicker'
import FileInput from '../'

describe('FileInput', function () {
  var noFileLabel = 'No file selected'
  var component

  beforeEach(function () {
    component = mount(<FileInput noFileLabel={noFileLabel} />)
  })

  describe('when no file selected', function () {
    it('should render the input field', function () {
      var input = component.find('.hui-FileInput__input')

      input.text().should.equal(noFileLabel)
    })

    it('should render the browse button', function () {
      var button = component.find('.hui-FileInput__browse')

      button.text().should.equal('Browse')
    })
  })

  describe('when has a file selected', function () {
    var filename = 'sample.gif'

    beforeEach(function () {
      component.setProps({
        value: { filename }
      })
    })

    it('should render the input field', function () {
      var input = component.find('.hui-FileInput__input')

      input.text().should.equal(filename)
    })

    it('should render the browse button', function () {
      var button = component.find('.hui-FileInput__browse')

      button.text().should.equal('Replace')
    })

    it('should render the reset button', function () {
      var button = component.find('.hui-FileInput__reset')

      expect(button.length).to.equal(1)
    })
  })

  describe('when errors', function () {
    it('should render the errors', function () {
      component.setProps({ errors: ['is not good'] })
      var errors = component.find('.hui-InputErrors')

      errors.text().should.contain('is not good')
    })
  })

  describe('mimetype options', () => {
    beforeEach(() => {
      sinon.stub(filepicker, 'pick')
    })

    afterEach(() => {
      filepicker.pick.restore()
    })

    it('sets a default mimetypes option', () => {
      component.find('.hui-FileInput__browse').first().simulate('click')
      expect(filepicker.pick.args[0][0].mimetypes).to.contain('image/*')
    })

    it('does not set a mimetypes option if extension option is present', () => {
      component = mount(
        <FileInput
          noFileLabel={noFileLabel}
          options={{ extension: '.jpg' }} />
      )

      component.find('.hui-FileInput__browse').first().simulate('click')
      expect(filepicker.pick.args[0][0].extension).to.equal('.jpg')
      expect(filepicker.pick.args[0][0].mimetypes).to.be.undefined
    })

    it('does not set a mimetypes option if extensions option is present', () => {
      component = mount(
        <FileInput
          noFileLabel={noFileLabel}
          options={{ extensions: ['.jpg', '.png'] }} />
      )

      component.find('.hui-FileInput__browse').first().simulate('click')
      expect(filepicker.pick.args[0][0].extensions).to.eql(['.jpg', '.png'])
      expect(filepicker.pick.args[0][0].mimetypes).to.be.undefined
    })
  })
})
