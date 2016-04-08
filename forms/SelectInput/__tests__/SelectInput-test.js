'use strict'

import Select from '../'

describe('SelectInput', function() {
  var options = [
    { value: 'six', label: 'Item 6' },
    { value: 'seven', label: 'Item 7' }
  ];

  describe('defaults', function() {
    var element, select;

    beforeEach(function() {
      element = renderIntoDocument(
          <Select options={ [{ value: 1, label: 'Item x' }] } prompt="Please select" />
        );
      select = findByTag(element, 'select');
    });

    it('no value', function() {
      select.value.should.equal('1');
    });

    it('no id', function() {
      select.id.should.equal('');
    });

    it('no name', function() {
      select.name.should.equal('');
    });

    it('does not render blank option', function() {
      var firstOption = scryByTag(element, 'option')[0];
      var node = firstOption;

      node.value.should.equal('1');
      node.textContent.should.equal('Item x');
    });
  });

  describe('properties', function() {
    var element, select;

    beforeEach(function() {
      element = renderIntoDocument(
          <Select
            type="email"
            value="six"
            id="seven"
            includeBlank
            options={ options } />
        );
      select = findByTag(element, 'select');
    });

    it('value of six', function() {
      select.value.should.equal('six');
    });

    it('display value when selection', function() {
      var display = findByClass(element, 'hui-SelectInput__selected');

      display.textContent.should.contain('Item 6');
    });

    it('id is select-seven', function() {
      select.id.should.equal('seven');
    });

    it('name is select-seven', function() {
      select.name.should.equal('seven');
    });

    it('blank option is rendered', function() {
      var firstOption = scryByTag(element, 'option')[0];
      var node = firstOption;

      node.value.should.equal('');
      node.textContent.should.equal('');
    });
  });

  describe('onChange', function() {
    it('is fired onChange', function() {
      var listener = sinon.spy();
      var element = renderIntoDocument(
            <Select
              onChange={ listener }
              options={ options } />
          );

      listener.should.have.not.been.called;

      var select = findByTag(element, 'select');
      Simulate.change(select);

      listener.should.have.been.called;
    });
  });

  describe('label behavior', function() {
    var element, label, labels;

    it('says what the label says', function() {
      element = renderIntoDocument(
        <Select label="words"/>
      );
      label = findByTag(element, 'label');

      label.textContent.should.equal('words');
    });

    it('is there if there is no value', function() {
      element = renderIntoDocument(
        <Select label="words"/>
      );
      labels = scryByTag(element, 'label');

      labels.length.should.equal(1);
    });
  });

  describe('validation behavior', function() {
    var element, errorClasses;

    it('defaults valid to true', function() {
      element = renderIntoDocument(
        <Select/>
      );
      errorClasses = scryByClass(element, 'hui-Input--error');

      errorClasses.length.should.equal(0);
    });

    it('when valid no hui-Input--error class', function() {
      element = renderIntoDocument(
        <Select valid />
      );
      errorClasses = scryByClass(element, 'hui-Input--error');

      errorClasses.length.should.equal(0);
    });

    it('when invalid there is a hui-SelectInput--error class', function() {
      element = renderIntoDocument(
        <Select errors={ ['I am an error'] } />
      );
      errorClasses = scryByClass(element, 'hui-SelectInput--error');

      errorClasses.length.should.equal(1);
    });

    it('shows errors', function() {
      element = renderIntoDocument(
        <Select errors={ ['I am an error'] }/>
      );
      errorClasses = scryByClass(element, 'hui-InputErrors');

      errorClasses.length.should.equal(1);
    });

    it('shows errors when required', function() {
      element = renderIntoDocument(
        <Select errorMessage={ 'I am an error' } required />
      );

      var select = findByTag(element, 'select');
      Simulate.change(select);

      errorClasses = scryByClass(element, 'hui-InputErrors');

      errorClasses.length.should.equal(1);
    });
  });
});
