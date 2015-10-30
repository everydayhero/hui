'use strict';

var AddressLookup;

function getFilterInputNode (subjectElement) {
  return subjectElement.refs.countrySelect
    .refs.countryFilter
    .refs.input.getDOMNode()
}

var lodash = require('lodash');
var mockDash = lodash.extend(lodash, {
  debounce: function(callback) { return callback; }
});

var addressSearchResult = {
  addresses: [
    { id: '123', label: 'TestAddressListing' }
  ]
};

var addressFindResult = {
  address: {
    street_address: '1 Place Pl',
    extended_address: '',
    locality: 'Sydney',
    postal_code: '2000',
    region: 'New South Wales',
    country_name: 'Australia'
  }
};

var mockAddress = {
  search: sinon.spy(function (_country, _query, cb) {
    return cb(addressSearchResult)
  }),
  find: sinon.spy(function (_id, _country, cb) {
    return cb(addressFindResult)
  })
};

describe('AddressLookup', function() {
  before(function () {
    AddressLookup = mockrequire('../', {
      '../../../lib/api/address': mockAddress,
      'lodash': mockDash
    });
  });

  beforeEach(function () {
    mockAddress.search.reset()
    mockAddress.find.reset()
  })

  it('allows you to select a country', function () {
    var element = renderIntoDocument(<AddressLookup country="GB" />);
    var countrySelectToggle = findByClass(element, 'CountrySelect__toggle').getDOMNode();
    Simulate.click(countrySelectToggle);
    var country = findByClass(element, 'CountrySelectItem--focused').getDOMNode();
    Simulate.click(country);
    expect(element.state.country.iso).to.eq('AU');
  })

  it('allows you to filter and select a country', function () {
    var element = renderIntoDocument(<AddressLookup country="AU" />);
    var countrySelectToggle = findByClass(element, 'CountrySelect__toggle').getDOMNode();
    Simulate.click(countrySelectToggle);

    var filterInputNode = getFilterInputNode(element);
    Simulate.change(filterInputNode, { target: { value: 'king' }});

    var country = findByClass(element, 'CountrySelectItem--focused').getDOMNode();
    Simulate.click(country);

    expect(element.state.country.iso).to.eq('GB');
  })

  xit('accepts an existing address', function () {
    var element = renderIntoDocument(<AddressLookup address={ addressFindResult.address } />);
    var breakdown = findByClass(element, 'AddressBreakdown');
    var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
    var locality = findByProp(breakdown, 'id', 'locality').getDOMNode();
    expect(streetAddress.value).to.eq('1 Place Pl');
    expect(locality.value).to.eq('Sydney');
  })

  xit('can be uniquely prefixed', function () {
    var element = renderIntoDocument(<AddressLookup prefix={ 'testPrefix-' } address={ addressFindResult.address } />);
    var breakdown = findByClass(element, 'AddressBreakdown');
    var streetAddress = findByProp(breakdown, 'name', 'testPrefix-street_address').getDOMNode();
    var locality = findByProp(breakdown, 'name', 'testPrefix-locality').getDOMNode();
    expect(streetAddress.value).to.eq('1 Place Pl');
    expect(locality.value).to.eq('Sydney');
  })

  it('UK postcode search requires at least 5 chars', function () {
    var element = renderIntoDocument(<AddressLookup country="GB" />);
    var addressInputNode = element.refs.lookup.refs.input.getDOMNode();
    Simulate.change(addressInputNode, { target: { value: '1234' }});
    expect(mockAddress.search).not.called;

    Simulate.change(addressInputNode, { target: { value: '12345' }});
    expect(mockAddress.search).calledWith('12345', 'GB');
  })

  it('Address search requires at least 7 chars', function () {
    var element = renderIntoDocument(<AddressLookup country="US"/>);
    var addressInputNode = element.refs.lookup.refs.input.getDOMNode();
    Simulate.change(addressInputNode, { target: { value: '123456' }});
    expect(mockAddress.search).not.called;

    Simulate.change(addressInputNode, { target: { value: '1234567' }});
    expect(mockAddress.search).calledWith('1234567', 'US');
  })

  it('returns a list of addreses', function () {
    var element = renderIntoDocument(<AddressLookup />);
    var addressInputNode = element.refs.lookup.refs.input.getDOMNode();
    Simulate.change(addressInputNode, { target: { value: 'TestAddress' }});
    expect(mockAddress.search).calledWith('TestAddress', 'AU');

    expect(element.state.addressList).to.eq(addressSearchResult.addresses);
  })

  it('address listing has a google class for logo styling', function () {
    var element = renderIntoDocument(<AddressLookup />);
    var addressInputNode = element.refs.lookup.refs.input.getDOMNode();
    Simulate.change(addressInputNode, { target: { value: 'TestAddress' }});

    var list = findByClass(element, 'AddressLookup__list-google');
    expect(list).to.be.ok;
  })

  xit('breaks down a selected US address', function () {
    var element = renderIntoDocument(<AddressLookup country={ 'US' } />);
    element.setList(addressSearchResult);
    var listItem = findByClass(element, 'AddressListing--focused').getDOMNode();
    Simulate.click(listItem);
    expect(mockAddress.find).calledWith('123', 'US');

    expect(element.state.address).to.eq(addressFindResult.address);

    var breakdown = findByClass(element, 'AddressBreakdown');
    var pafValidated = findByProp(breakdown, 'name', 'paf_validated').getDOMNode();
    var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
    var locality = findByProp(breakdown, 'id', 'locality').getDOMNode();
    expect(pafValidated.value).to.eq('false');
    expect(streetAddress.value).to.eq('1 Place Pl');
    expect(locality.value).to.eq('Sydney');
  })

  describe('selected address', function () {
    var element, listItem, validate;

    beforeEach(function() {
      validate = sinon.spy(function () { return true });
      element = renderIntoDocument(<AddressLookup validate={ validate } country={ "GB" }/>);
      element.setList(addressSearchResult);
      listItem = findByClass(element, 'AddressListing--focused').getDOMNode();
      Simulate.click(listItem);
      expect(mockAddress.find).calledWith('123', 'GB');
      expect(element.state.address).to.eq(addressFindResult.address);
    });

    xit('breaks down a selected GB address', function () {
      var breakdown = findByClass(element, 'AddressBreakdown');
      var pafValidated = findByProp(breakdown, 'name', 'paf_validated').getDOMNode();
      var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
      var locality = findByProp(breakdown, 'id', 'locality').getDOMNode();
      expect(pafValidated.value).to.eq('true');
      expect(element.state.custom).to.eq(null);
      expect(streetAddress.value).to.eq('1 Place Pl');
      expect(locality.value).to.eq('Sydney');

      Simulate.change(streetAddress, { target: { value: '2 SomeOther St' }});
      expect(pafValidated.value).to.eq('false');
      expect(element.state.custom).to.be.ok;
    })

    it('calls the validate prop on breaking down a selected address', function () {
      expect(validate).to.be.called;
    })
  })

  xit('breaks down an empty address on manual entry', function() {
    var element = renderIntoDocument(<AddressLookup country={ 'AU' } />);
    element.setList(addressSearchResult);
    var manualEntry = findByClass(element, 'AddressLookup__manual').getDOMNode();
    Simulate.click(manualEntry);

    var breakdown = findByClass(element, 'AddressBreakdown');
    var streetAddress = findByProp(breakdown, 'id', 'street_address').getDOMNode();
    expect(streetAddress.value).to.eq('');
    var countryName = findByProp(breakdown, 'id', 'country_name').getDOMNode();
    expect(countryName.value).to.eq('Australia');
  });

  it('allows you to reset the address', function() {
    var validate = sinon.spy();
    var element = renderIntoDocument(<AddressLookup validate={ validate } address={ addressFindResult.address } />);
    var resetButton = findByClass(element, 'AddressLookup__reset').getDOMNode();
    Simulate.click(resetButton);
    var addressLookup = findByClass(element, 'AddressLookup').getDOMNode();
    expect(addressLookup).to.be.ok;
    expect(validate).to.be.called;
  });

  it('allows you to call output callback when reset the address', function() {
    var callback = sinon.spy();
    var element = renderIntoDocument(<AddressLookup address={ addressFindResult.address } onChange={ callback } />);
    var resetButton = findByClass(element, 'AddressLookup__reset').getDOMNode();
    Simulate.click(resetButton);
    expect(callback).to.be.called;
  });

  it('disables address lookup for Ireland', function() {
    var element = renderIntoDocument(<AddressLookup country="IE" />);
    var breakdown = findByClass(element, 'AddressBreakdown').getDOMNode();
    expect(breakdown).to.be.ok;
    var resetButton = scryByClass(element, 'AddressLookup__reset');
    expect(resetButton.length).to.eq(0);
  });
})
