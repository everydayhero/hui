"use strict";

require('./testdom')('<html><body></body></html>');

global._ = require('lodash');
global.chai = require("chai");
global.should = chai.should();
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.sinon = require('sinon');
global.React = require('react/addons');

global.TestUtils = React.addons.TestUtils;
global.scryByType = TestUtils.scryRenderedComponentsWithType;
global.findByType = TestUtils.findRenderedComponentWithType;
global.scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
global.findByClass = TestUtils.findRenderedDOMComponentWithClass;
global.scryByTag = TestUtils.scryRenderedDOMComponentsWithTag;
global.findByTag = TestUtils.findRenderedDOMComponentWithTag;
global.scryByProp = require('./scryRenderedDOMComponentsWithProp').scryRenderedDOMComponentsWithProp;
global.findByProp = require('./scryRenderedDOMComponentsWithProp').findRenderedDOMComponentWithProp;
global.getRouterComponent = require('./router');

global.blanket = require('blanket')({
  pattern: /(app|lib)\/[^-]+\.js/
});

global.swallow = function (thrower) {
  try {
    thrower();
  } catch (e) { }
};

chai.use(require('sinon-chai'));
