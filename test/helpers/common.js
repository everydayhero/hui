'use strict'

require('./testdom')('<html><body></body></html>')

global.React = require('react')
const ReactDOM = require('react-dom')
global.findDOMNode = ReactDOM.findDOMNode

global.chai = require('chai')
global.should = chai.should()
global.expect = chai.expect
global.AssertionError = chai.AssertionError
global.sinon = require('sinon')

const TestUtils = require('react-addons-test-utils')
global.TestUtils = TestUtils
global.renderIntoDocument = TestUtils.renderIntoDocument
global.Simulate = TestUtils.Simulate
global.scryByType = TestUtils.scryRenderedComponentsWithType
global.findByType = TestUtils.findRenderedComponentWithType
global.scryByClass = TestUtils.scryRenderedDOMComponentsWithClass
global.findByClass = TestUtils.findRenderedDOMComponentWithClass
global.scryByTag = TestUtils.scryRenderedDOMComponentsWithTag
global.findByTag = TestUtils.findRenderedDOMComponentWithTag
global.scryByAttribute = require('./scryRenderedDOMComponentsWithAttribute').scryRenderedDOMComponentsWithAttribute
global.findByAttribute = require('./scryRenderedDOMComponentsWithAttribute').findRenderedDOMComponentWithAttribute

chai.use(require('sinon-chai'))
