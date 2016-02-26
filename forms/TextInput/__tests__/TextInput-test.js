'use strict'

import TextInput from '../'

describe('TextInput', function() {

  describe('defaults', function() {
    var element, input

    beforeEach(function() {
      element = renderIntoDocument(<TextInput />)
      input = findByTag(element, 'input')
    })

    it('type of text', function() {
      input.getDOMNode().type.should.equal('text')
    })

    it('value of null', function() {
      input.getDOMNode().value.should.equal('')
    })

    it('id of null', function() {
      input.getDOMNode().id.should.equal('')
    })

    it('name of null', function() {
      input.getDOMNode().name.should.equal('')
    })

    it('readOnly', function() {
      input.getDOMNode().readOnly.should.equal(false)
    })

    it('no placeholder element', function() {
      var placeholders = scryByTag(element, 'placeholder')
      placeholders.length.should.equal(0)
    })

    it('renders an input', function() {
      var props = {
        name: 'test_input',
        label: 'Test Input',
        hint: 'This is a test',
        errorMessage: 'This input errored correctly'
      }
      element = renderIntoDocument(<TextInput { ...props } icon="bolt" width="half" />)
      findByClass(element, 'hui-TextInput__input')
      findByProp(element, 'name', 'test_input')

      var label = findByClass(element, 'hui-TextInput__label').getDOMNode()
      label.textContent.should.contain('Test Input')

      element.setState({ focused: true })
      var hint = findByClass(element, 'hui-TextInput__message').getDOMNode()
      hint.textContent.should.contain('This is a test')

      findByClass(element, 'fa-bolt')

      element.setValid(false)

      var error = findByClass(element, 'hui-TextInput__message').getDOMNode()
      error.textContent.should.contain('This input errored correctly')
    })
  })

  describe('properties', function() {
    var element, input

    beforeEach(function() {
      element = renderIntoDocument(<TextInput
        type="email"
        value="six"
        id="seven"
        name="eight"
        icon="rocket"
        placeHolder="placeHolder"
        readOnly />)
      input = findByTag(element, 'input')
    })

    it('type of email', function() {
      input.getDOMNode().type.should.equal('email')
    })

    it('value of six', function() {
      input.getDOMNode().value.should.equal('six')
    })

    it('id is TextInput-seven', function() {
      input.getDOMNode().id.should.equal('seven')
    })

    it('name is TextInput-seven', function() {
      input.getDOMNode().name.should.equal('eight')
    })

    it('placeHolder is present', function() {
      element = renderIntoDocument(<TextInput
        type="email"
        id="seven"
        name="eight"
        icon="rocket"
        placeHolder="placeHolder"
        readOnly />)
      findByClass(element, 'hui-TextInput__placeHolder')
    })

    it('icon is default', function() {
      findByClass(element, 'hui-TextInput__input--icon')
      findByClass(element, 'hui-TextInput__icon')
    })
  })

  describe('handles numeric values', function() {
    var element, input

    beforeEach(function() {
      element = renderIntoDocument(<TextInput
        value={ 6 }
        id="seven"
        name="eight"
        icon="rocket"
        readOnly />)
      input = findByTag(element, 'input')
    })

    it('value of 6', function() {
      input.getDOMNode().value.should.equal('6')
    })
  })

  describe('icon left', function() {
    var element, input

    beforeEach(function() {
      element = renderIntoDocument(<TextInput
        type="email"
        value="six"
        id="seven"
        name="eight"
        icon="rocket"
        iconPosition="left" />)
      input = findByTag(element, 'input')
    })

    it('type of email', function() {
      input.getDOMNode().type.should.equal('email')
    })

    it('value of six', function() {
      input.getDOMNode().value.should.equal('six')
    })

    it('id is TextInput-seven', function() {
      input.getDOMNode().id.should.equal('seven')
    })

    it('name is TextInput-seven', function() {
      input.getDOMNode().name.should.equal('eight')
    })

    it('icon is left', function() {
      findByClass(element, 'hui-TextInput__input--icon-left')
      findByClass(element, 'hui-TextInput__icon--left')
    })
  })

  describe('onChange', function() {
    it('is fired onChange', function() {
      var listener = sinon.stub()
      var value = 'foo'
      var element = renderIntoDocument(<TextInput onChange={listener} value={ value }/>)
      var input = findByTag(element, 'input')

      Simulate.change(input)
      listener.should.have.been.calledWith(value)
    })
  })

  describe('validation behavior', function() {
    var element, errorClasses

    it('defaults valid to true', function() {
      element = renderIntoDocument(<TextInput/>)
      errorClasses = scryByClass(element, 'hui-TextInput--error')[0]

      expect(errorClasses).to.equal(undefined)
    })

    it('does not have TextInput--error class when errors is null', function() {
      element = renderIntoDocument(<TextInput errors={ null } />)
      errorClasses = scryByClass(element, 'hui-TextInput--error')

      errorClasses.length.should.equal(0)
    })

    it('does not have TextInput--error class when errors is empty', function() {
      element = renderIntoDocument(<TextInput errors={ [] } />)
      errorClasses = scryByClass(element, 'hui-TextInput--error')

      errorClasses.length.should.equal(0)
    })

    it('does have TextInput--error class when errors is present', function() {
      element = renderIntoDocument(<TextInput errors={ [true] } errorMessage="foo" />)
      errorClasses = scryByClass(element, 'hui-TextInput--error')

      errorClasses.length.should.equal(1)
    })

    it('does have a message element when errors is present', function() {
      element = renderIntoDocument(<TextInput errors={ [true] } />)
      const subject = findByClass(element, 'hui-TextInput__message')

      expect(subject).to.be.ok
    })

    it('does not have a message element when errors is empty', function() {
      element = renderIntoDocument(<TextInput errors={ [] } />)
      const subject = scryByClass(element, 'hui-TextInput__message').length

      expect(subject).to.eq(0)
    })
  })

  describe('readOnly behavior', function() {
    it('will not alter input when readOnly', function() {
      var element = renderIntoDocument(<TextInput value="oldValue" readOnly />)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()
      Simulate.change(input, { target: { value: 'newValue' }})

      input.value.should.equal('oldValue')
    })

    it('will not execute methods when disabled', function() {
      var onFocus = sinon.spy()
      var onChange = sinon.spy()
      var validate = sinon.spy()
      var element = renderIntoDocument(<TextInput value="oldValue" disabled onFocus={ onFocus } onChange={ onChange } validate={ validate } />)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()

      Simulate.focus(input)
      Simulate.change(input, { target: { value: 'newValue' }})
      Simulate.blur(input)

      onFocus.should.have.not.been.called
      onChange.should.have.not.been.called
      validate.should.have.not.been.called
      input.value.should.equal('oldValue')
    })
  })

  describe('readOnly callbacks', function() {

    it('will execute onFocus function on focus', function() {
      var onFocus = sinon.spy()
      var element = renderIntoDocument(<TextInput value="testValue" onFocus={ onFocus } />)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()
      Simulate.focus(input)

      var object = {
        element: element.getDOMNode(),
        value: 'testValue'
      }

      onFocus.should.have.been.calledWith(object)
    })

    it('will execute onChange function on change', function() {
      var onChange = sinon.spy()
      var element = renderIntoDocument(<TextInput value="oldValue" onChange={ onChange } />)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()

      Simulate.change(input, { target: { value: 'newValue' }})

      onChange.should.have.been.calledWith('newValue')
    })

    it('will execute mask function on change', function() {
      var onChange = function(value) {
        this.setProps({ value })
      }
      var mask = sinon.stub().returns('newValue--masked')
      var element = renderIntoDocument(<TextInput value="oldValue" mask={ mask } />)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()
      element.setProps({ onChange: onChange.bind(element) })

      Simulate.change(input, { target: { value: 'newValue' }})

      mask.should.have.been.calledWith('newValue')
      input.value.should.equal('newValue--masked')
    })

    it('will not execute validate function on blur if not required', function() {
      var validate = sinon.spy()
      var onChange = function(value) {
        this.setProps({ value })
      }
      var element = renderIntoDocument(<TextInput required={ false } validate={ validate } />)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()
      element.setProps({ onChange: onChange.bind(element) })
      Simulate.blur(input)

      validate.should.have.not.been.called
    })

    it('will execute validate function on blur if required', function() {
      var onChange = function(value) {
        this.setProps({ value })
      }
      var validate = sinon.stub()
      var element = renderIntoDocument(<TextInput required validate={ validate } />)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()
      element.setProps({ onChange: onChange.bind(element) })

      Simulate.change(input, { target: { value: 'testValue' }})
      Simulate.blur(input)
      validate.should.have.been.calledWith('testValue', element.setValid)

      validate.callsArgWith(1, true)
      Simulate.blur(input)
      element.state.valid.should.equal(true)

      validate.callsArgWith(1, false)
      Simulate.blur(input)
      element.state.valid.should.equal(false)
    })

    it('will execute onError callback on load if has validate method', function() {
      var validate = sinon.stub().returns(true)
      var onError = sinon.stub()
      renderIntoDocument(<TextInput required validate={ validate } onError={ onError } />)

      validate.should.have.been.calledWith('')
      onError.should.have.been.calledWith(false)
    })

    it('will execute validate function on load if has value', function() {
      var validate = sinon.stub()
      var element = renderIntoDocument(<TextInput required value="testValue" validate={ validate } />)

      validate.should.have.been.calledWith('testValue', element.setValid)

      validate.args[0][1](true)
      element.state.valid.should.equal(true)
    })

    it('will execute onBlur prop on blur', function() {
      var onBlur = sinon.spy()
      var value = 'foo'
      var element = renderIntoDocument(<TextInput required onBlur={ onBlur }  value={ value }/>)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()

      Simulate.blur(input)
      onBlur.should.have.been.calledWith(value)
    })

    it('will execute onBlur prop on blur', function() {
      var onTab = sinon.spy()
      var value = 'foo'
      var element = renderIntoDocument(<TextInput required onTab={ onTab }  value={ value }/>)
      var input = findByClass(element, 'hui-TextInput__input').getDOMNode()

      Simulate.keyDown(input, { key: 'Tab' })
      onTab.should.have.been.calledWith(value)
    })
  })
})
