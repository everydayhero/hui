"use strict";

var Input = require('../');

describe('TextInput', function() {

  describe('defaults', function() {
    var element, input;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Input />);
      input = findByTag(element, 'input');
    });

    it('type of text', function() {
      expect(input.getDOMNode().type).to.equal('text');
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

    it('readOnly', function() {
      expect(input.getDOMNode().readOnly).to.equal(false);
    });

    it('no placeholder element', function() {
      var placeholders = scryByTag(element, 'placeholder');
      expect(placeholders.length).to.equal(0);
    });

    it('renders an input', function() {
      var props = {
        name: 'test_input',
        label: 'Test Input',
        hint: 'This is a test',
        errorMessage: 'This input errored correctly'
      };
      var element = TestUtils.renderIntoDocument(<Input { ...props } icon="bolt" width="half" />);
      var input = findByClass(element, 'hui-TextInput__input');
      expect(input).to.exist;

      var inputWithName = findByProp(element, 'name', 'test_input');
      expect(inputWithName).to.exist;

      var label = findByClass(element, 'hui-TextInput__label').getDOMNode();
      expect(label.textContent).to.contain('Test Input');

      var hint = findByClass(element, 'hui-TextInput__message').getDOMNode();
      expect(hint.textContent).to.contain('This is a test');

      var icon = findByClass(element, 'fa-bolt');
      expect(icon).to.exist;

      element.setValid(false);

      var error = findByClass(element, 'hui-TextInput__message').getDOMNode();
      expect(error.textContent).to.contain('This input errored correctly');

      var errorIcon = findByClass(element, 'fa-times');
      expect(errorIcon).to.exist;
    });
  });

  describe('properties', function() {
    var element, input;

    beforeEach(function() {
      element = TestUtils.renderIntoDocument(<Input
        type="email"
        value="six"
        id="seven"
        name="eight"
        readOnly={ true } />);
      input = findByTag(element, 'input');
    });

    it('type of email', function() {
      expect(input.getDOMNode().type).to.equal('email');
    });

    it('value of six', function() {
      expect(input.getDOMNode().value).to.equal('six');
    });

    it('id is TextInput-seven', function() {
      expect(input.getDOMNode().id).to.equal('seven');
    });

    it('name is TextInput-seven', function() {
      expect(input.getDOMNode().name).to.equal('eight');
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var listener = sinon.stub();
      var value = "foo";
      var element = TestUtils.renderIntoDocument(<Input onChange={listener} value={ value }/>);
      var input = findByTag(element, 'input');

      TestUtils.Simulate.change(input);
      expect(listener).to.have.been.calledWith(value);
    });
  });

  describe('validation behavior', function() {
    var element, errorClasses;

    it('defaults valid to true', function() {
      element = TestUtils.renderIntoDocument(<Input/>);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).to.equal(0);
    });

    it('does not have TextInput--error class when errors is null', function() {
      element = TestUtils.renderIntoDocument(<Input errors={ null } />);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).to.equal(0);
    });

    it('does not have TextInput--error class when errors is empty', function() {
      element = TestUtils.renderIntoDocument(<Input errors={ [] } />);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).to.equal(0);
    });

    it('does have TextInput--error class when errors is present', function() {
      element = TestUtils.renderIntoDocument(<Input error={ true } errorMessage="foo" />);
      errorClasses = scryByClass(element, 'hui-TextInput--error');

      expect(errorClasses.length).to.equal(1);
    });
  });

  describe('readOnly behavior', function() {
    it("will not alter input when readOnly", function() {
      var element = TestUtils.renderIntoDocument(<Input value="oldValue" readOnly={ true } />);
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode();
      TestUtils.Simulate.change(input, { target: { value: 'newValue' } });

      expect(input.value).to.equal('oldValue');
    });

    it("will not execute methods when disabled", function() {
      var modal = sinon.spy();
      var output = sinon.spy();
      var validate = sinon.spy();
      var element = TestUtils.renderIntoDocument(<Input value="oldValue" disabled={ true } modal={ modal }output={ output } validate={ validate } />);
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode();

      TestUtils.Simulate.focus(input);
      TestUtils.Simulate.change(input, { target: { value: 'newValue' } });
      TestUtils.Simulate.blur(input);

      expect(modal).to.have.not.been.called;
      expect(output).to.have.not.been.called;
      expect(validate).to.have.not.been.called;
      expect(input.value).to.equal('oldValue');
    });
  });

  describe('readOnly callbacks', function() {

    it("will execute modal function on focus", function() {
      var modal = sinon.spy();
      var element = TestUtils.renderIntoDocument(<Input value="testValue" modal={ modal } />);
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode();
      TestUtils.Simulate.focus(input);

      var object = {
        element: element.getDOMNode(),
        value: 'testValue',
        callback: element.setValue
      };

      expect(modal).to.have.been.calledWith(object);
    });

    it("will execute output function on change", function() {
      var output = sinon.spy();
      var element = TestUtils.renderIntoDocument(<Input value="oldValue" output={ output } />);
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode();

      TestUtils.Simulate.change(input, { target: { value: 'newValue' } });

      expect(output).to.have.been.calledWith('newValue');
    });

    it("will execute mask function on change", function() {
      var mask = sinon.stub().returns('newValue--masked');
      var element = TestUtils.renderIntoDocument(<Input value="oldValue" mask={ mask } />);
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode();

      TestUtils.Simulate.change(input, { target: { value: 'newValue' } });

      expect(mask).to.have.been.calledWith('newValue');
      expect(input.value).to.equal('newValue--masked');
    });

    it("will not execute validate function on blur if not required", function() {
      var validate = sinon.spy();
      var element = TestUtils.renderIntoDocument(<Input required={ false } validate={ validate } />);
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode();

      TestUtils.Simulate.blur(input);

      expect(validate).to.have.not.been.called;
    });

    it("will execute validate function on blur if required", function() {
      var validate = sinon.stub();
      var element = TestUtils.renderIntoDocument(<Input required={ true } validate={ validate } />);
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode();

      TestUtils.Simulate.change(input, { target: { value: 'testValue' } });
      TestUtils.Simulate.blur(input);
      expect(validate).to.have.been.calledWith('testValue', element.setValid);

      validate.callsArgWith(1, true);
      TestUtils.Simulate.blur(input);
      expect(element.state.valid).to.equal(true);

      validate.callsArgWith(1, false);
      TestUtils.Simulate.blur(input);
      expect(element.state.valid).to.equal(false);
    });

    it("will execute onError callback on load if has validate method", function() {
      var validate = sinon.stub().returns(true);
      var onError = sinon.stub();
      var element = TestUtils.renderIntoDocument(<Input validate={ validate } onError={ onError } />);

      expect(validate).to.have.been.calledWith('');
      expect(onError).to.have.been.calledWith(false);
    });

    it("will execute validate function on load if has value", function() {
      var validate = sinon.stub();
      var element = TestUtils.renderIntoDocument(<Input required={ true } value="testValue" validate={ validate } />);

      expect(validate).to.have.been.calledWith('testValue', element.setValid);

      validate.args[0][1](true);
      expect(element.state.valid).to.equal(true);
    });
  });
});
