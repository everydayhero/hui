'use strict';

require('./testdom')('<html><body></body></html>');

global._ = require('lodash');
global.React = require('react/addons');
global.Promise = require('bluebird');

global.chai = require('chai');
global.should = chai.should();
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.sinon = require('sinon');

global.reactModulesToStub = [
  'FileInput/index',
  'edh-widgets'
];
global.mockcomponent = function(str) {
  global.reactModulesToStub.push(str);
};
global.unmockcomponent = function(str) {
  global._.pull(global.reactModulesToStub, str);
};
global.mockrequire = require('mockrequire');

global.TestUtils = React.addons.TestUtils;
global.renderIntoDocument = TestUtils.renderIntoDocument;
global.Simulate = TestUtils.Simulate;
global.scryByType = TestUtils.scryRenderedComponentsWithType;
global.findByType = TestUtils.findRenderedComponentWithType;
global.scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
global.findByClass = TestUtils.findRenderedDOMComponentWithClass;
global.scryByTag = TestUtils.scryRenderedDOMComponentsWithTag;
global.findByTag = TestUtils.findRenderedDOMComponentWithTag;
global.scryByProp = require('./scryRenderedDOMComponentsWithProp').scryRenderedDOMComponentsWithProp;
global.findByProp = require('./scryRenderedDOMComponentsWithProp').findRenderedDOMComponentWithProp;

var blanketOptions = require('./blanket-options');
global.blanket = require('blanket')(blanketOptions);

global.swallow = function (thrower) {
  try {
    thrower();
  } catch (e) {
    console.log('Swallow error');
  }
};

chai.use(require('sinon-chai'));
