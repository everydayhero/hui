'use strict'

import TestUtils from 'react-addons-test-utils'

function scryRenderedDOMComponentsWithAttribute(root, attributeName, attributeValue) {
  return TestUtils.findAllInRenderedTree(root, function(inst) {
    return TestUtils.isDOMComponent(inst) &&
      inst.getAttribute(attributeName) === attributeValue
  })
}

function findRenderedDOMComponentWithAttribute(root, attributeName, attributeValue) {
  var all = scryRenderedDOMComponentsWithAttribute(
    root,
    attributeName,
    attributeValue
  )
  if (all.length !== 1) {
    throw new Error(
      'Did not find exactly one match for ' + attributeName + ':' + attributeValue
    )
  }
  return all[0]
}

module.exports = {
  scryRenderedDOMComponentsWithAttribute,
  findRenderedDOMComponentWithAttribute
}
