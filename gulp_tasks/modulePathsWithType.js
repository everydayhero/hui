var modulePaths = [
  'forms/**/*.{type}',
  'buttons/**/*.{type}',
  'DemoPage/**/*.{type}',
  'layout/**/*.{type}',
  'mixins/**/*.{type}',
  'navigation/**/*.{type}',
  'typography/**/*.{type}'
];

function modulePathsWithType(type) {
  var paths = [];

  for (var i = 0; i < modulePaths.length; i++) {
    paths.push(modulePaths[i].replace('{type}', type));
  };

  return paths;
}

module.exports = modulePathsWithType;
