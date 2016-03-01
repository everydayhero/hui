'use strict';

import Input from '../'

describe('Checkbox', function() {
  describe('defaults', function() {
    var element = renderIntoDocument(
      <Input/>
    );
    var input = findByTag(element, 'input');

    it('type of checkbox', function() {
      input.type.should.equal('checkbox');
    });

    it('value of null', function() {
      input.value.should.equal('');
    });

    it('id of null', function() {
      input.id.should.equal('');
    });

    it('name of null', function() {
      input.name.should.equal('');
    });
  });

  describe('with clickable label', function() {
    var element = renderIntoDocument(
      <Input
        label={ 'free tacos' } />
    );

    it('contains a label', function() {
      var label = findByClass(element, 'hui-Checkbox__label');

      label.nodeName.toLowerCase().should.equal('label');
    });
  });

  describe('with non-clickable label', function() {
    var element = renderIntoDocument(
      <Input
        label={ 'free tacos' }
        labelIsClickable={ false } />
    );

    it('contains a span label', function() {
      var label = findByClass(element, 'hui-Checkbox__label');

      label.nodeName.toLowerCase().should.equal('span');
    });
  });

  describe('properties', function() {
    var element = renderIntoDocument(
      <Input value={ true } id="seven" />
    );
    var input = findByTag(element, 'input');

    it('type of checkbox', function() {
      input.type.should.equal('checkbox');
    });

    it('value of true', function() {
      input.checked.should.equal(true);
    });

    describe('Passed an id of seven', function() {
      it('id is seven', function() {
        input.id.should.equal('seven');
      });

      it('name is seven', function() {
        input.name.should.equal('seven');
      });
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var onChange = sinon.spy();
      var element = renderIntoDocument(<Input onChange={onChange}/>);
      var input = findByTag(element, 'input');
      Simulate.change(input);

      onChange.should.have.been.calledWith(false);
    });
  });

  describe('onBlur', function() {
    it('is fired onBlur', function() {
      var onBlur = sinon.spy();
      var element = renderIntoDocument(<Input onBlur={onBlur}/>);
      var input = findByTag(element, 'input');
      Simulate.blur(input);

      onBlur.should.have.been.calledWith(false);
    });
  });

  describe('validation behavior', function() {
    it('when valid no hui-Input--error class', function() {
      var element = renderIntoDocument(<Input/>);
      var errorClasses = scryByClass(element, 'hui-Input--error');
      errorClasses.length.should.equal(0);
    });

    it('when invalid there is a hui-Input--error class', function() {
      var element = renderIntoDocument(<Input errors={ ['error'] }/>);
      var errorClasses = scryByClass(element, 'hui-Input--error');
      errorClasses.length.should.equal(1);
    });

    it('shows errors', function() {
      var element = renderIntoDocument(<Input valid={false} errors={ ['foo'] } />);
      var errorClasses = scryByClass(element, 'hui-InputErrors');
      errorClasses.length.should.equal(1);
    });
  });
});
