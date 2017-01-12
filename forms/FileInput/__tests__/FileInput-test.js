'use strict'

import FileInput from '../'
import filepicker from '../../../lib/filepicker'

describe('FileInput', function() {
  var noFileLabel = 'No file selected';
  var component;

  beforeEach(function() {
    component = renderIntoDocument(<FileInput noFileLabel={noFileLabel} />);
  });

  describe('when no file selected', function() {
    it('should render the input field', function() {
      var input = findByClass(component, 'hui-FileInput__input');

      input.textContent.should.equal(noFileLabel);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      button.textContent.should.equal('Browse');
    });
  });

  describe('when has a file selected', function() {
    var filename = 'sample.gif';

    beforeEach(function() {
      component.setProps({
        value: { filename }
      });
    });

    it('should render the input field', function() {
      var input = findByClass(component, 'hui-FileInput__input');

      input.textContent.should.equal(filename);
    });

    it('should render the browse button', function() {
      var button = findByClass(component, 'hui-FileInput__browse');

      button.textContent.should.equal('Replace');
    });

    it('should render the reset button', function() {
      var button = findByClass(component, 'hui-FileInput__reset');

      button.should.exist;
    });
  });

  describe('when errors', function() {
    it('should render the errors', function() {
      component.setProps({ errors: ['is not good'] });
      var errors = findByClass(component, 'hui-InputErrors');

      errors.textContent.should.contain('is not good');
    });
  });

  describe('mimetype options', function () {
    beforeEach(function () {
      sinon.stub(filepicker, 'pick')
    })

    afterEach(function () {
      filepicker.pick.restore()
    })

    it('sets a default mimetypes option', function () {
      Simulate.click(findByClass(component, 'hui-FileInput__browse'))
      expect(filepicker.pick.args[0][0].mimetypes).to.contain('image/*')
    })

    it('does not set a mimetypes option if extension option is present', function () {
      component = renderIntoDocument(
        <FileInput
          noFileLabel={noFileLabel}
          options={{ extension: '.jpg' }} />
      )

      Simulate.click(findByClass(component, 'hui-FileInput__browse'))
      expect(filepicker.pick.args[0][0].extension).to.equal('.jpg')
      expect(filepicker.pick.args[0][0].mimetypes).to.be.undefined
    })

    it('does not set a mimetypes option if extensions option is present', function () {
      component = renderIntoDocument(
        <FileInput
          noFileLabel={noFileLabel}
          options={{ extensions: ['.jpg', '.png'] }} />
      )

      Simulate.click(findByClass(component, 'hui-FileInput__browse'))
      expect(filepicker.pick.args[0][0].extensions).to.eql(['.jpg', '.png'])
      expect(filepicker.pick.args[0][0].mimetypes).to.be.undefined
    })
  })
});
