"use strict";

describe('Checkbox', function() {
  var React       = require('react/addons');
  var Input       = require('../');

  describe('defaults', function() {
    var element = TestUtils.renderIntoDocument(
      <Input/>
    );
    var input = findByTag(element, 'input');

    it('type of checkbox', function() {
      expect(input.getDOMNode().type).to.equal('checkbox');
    });

    it('value of null', function() {
      expect(input.getDOMNode().value).to.equal('');
    });

    it('id of null', function() {
      expect(input.getDOMNode().id).to.equal('');
    });

    it('name of null', function() {
      expect(input.getDOMNode().name).to.equal('');
    });
  });

  describe('with clickable label', function() {
    var element = TestUtils.renderIntoDocument(
      <Input
        label={ 'free tacos' } />
    );

    it('contains a label', function() {
      var label = findByClass(element, 'hui-Checkbox__label');

      expect(label.getDOMNode().nodeName.toLowerCase()).to.equal('label');
    });
  });

  describe('with non-clickable label', function() {
    var element = TestUtils.renderIntoDocument(
      <Input
        label={ 'free tacos' }
        labelIsClickable={ false } />
    );

    it('contains a span label', function() {
      var label = findByClass(element, 'hui-Checkbox__label');

      expect(label.getDOMNode().nodeName.toLowerCase()).to.equal('span');
    });
  });

  describe('properties', function() {
    var element = TestUtils.renderIntoDocument(
      <Input value={ true } id="seven" />
    );
    var input = findByTag(element, 'input');

    it('type of checkbox', function() {
      expect(input.getDOMNode().type).to.equal('checkbox');
    });

    it('value of true', function() {
      expect(input.getDOMNode().checked).to.equal(true);
    });

    describe('Passed an id of seven', function() {
      it('id is seven', function() {
        expect(input.getDOMNode().id).to.equal('seven');
      });

      it('name is seven', function() {
        expect(input.getDOMNode().name).to.equal('seven');
      });
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var onChange = sinon.spy();
      var element = TestUtils.renderIntoDocument(
        <Input onChange={onChange}/>
      );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.change(input);

      expect(onChange).to.have.been.calledWith(false);
    });
  });

  describe('onBlur', function() {
    it('is fired onBlur', function() {
      var onBlur = sinon.spy();
      var element = TestUtils.renderIntoDocument(
        <Input onBlur={onBlur}/>
      );
      var input = findByTag(element, 'input');
      TestUtils.Simulate.blur(input);

      expect(onBlur).to.have.been.calledWith(false);
    });
  });

  describe('validation behavior', function() {
    it('when valid no hui-Input--error class', function() {
      var element = TestUtils.renderIntoDocument(
        <Input/>
      );
      var errorClasses = scryByClass(element, 'hui-Input--error');
      expect(errorClasses.length).to.equal(0);
    });

    it('when invalid there is a hui-Input--error class', function() {
      var element = TestUtils.renderIntoDocument(
        <Input errors={ ['error'] }/>
      );
      var errorClasses = scryByClass(element, 'hui-Input--error');
      expect(errorClasses.length).to.equal(1);
    });

    it('shows errors', function() {
      var element = TestUtils.renderIntoDocument(
        <Input valid={false} errors={ ['foo'] } />
      );
      var errorClasses = scryByClass(element, 'hui-InputErrors');
      expect(errorClasses.length).to.equal(1);
    });
  });
});
