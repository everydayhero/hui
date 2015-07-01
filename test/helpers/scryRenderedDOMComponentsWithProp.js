'use strict';

var { TestUtils } = require('react/addons').addons;

function scryRenderedDOMComponentsWithProp(root, propName, propValue) {
  return TestUtils.findAllInRenderedTree(root, function(inst) {
    return TestUtils.isDOMComponent(inst) &&
      inst.props.hasOwnProperty(propName) &&
      inst.props[propName] === propValue;
  });
}

function findRenderedDOMComponentWithProp(root, propName, propValue) {
  var all = scryRenderedDOMComponentsWithProp(
    root,
    propName,
    propValue
  );
  if (all.length !== 1) {
    throw new Error(
      'Did not find exactly one match for ' + propName + ':' + propValue
    );
  }
  return all[0];
}

module.exports = {
  scryRenderedDOMComponentsWithProp,
  findRenderedDOMComponentWithProp
};
