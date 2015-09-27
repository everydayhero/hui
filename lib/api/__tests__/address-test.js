'use strict';

var mockGetJSONP = sinon.spy(function (url, cb) {
  cb('Well done')
});

var address = mockrequire('../address', {
  '../getJSONP': mockGetJSONP
});

describe('address', function() {
  beforeEach(function () {
    mockGetJSONP.reset();
  });

  describe('find', function() {
    it('gets an address by id', function () {
      var callback = sinon.spy();
      address.find('123', 'uk', callback);

      expect(mockGetJSONP).calledWith('https://everydayhero.com/api/v2/addresses/uk/123.jsonp');
      expect(callback).calledWith('Well done');
    });
  });

  describe('search', function() {
    it('searches for addresses', function () {
      var callback = sinon.spy();
      address.search('Foooos', 'uk', callback);

      expect(mockGetJSONP).calledWith('https://everydayhero.com/api/v2/addresses.jsonp?country_code=uk&q=Foooos');
      expect(callback).calledWith('Well done');
    });
  });
});
