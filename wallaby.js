var path = require('path');

module.exports = function(wallaby) {
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules');

  require('module').Module._initPaths();

  // Babel needs this
  process.env.NODE_ENV = 'development';

  const babelCompiler = wallaby.compilers.babel({
    presets: ['latest', 'react'],
    plugins: ['transform-object-rest-spread', 'transform-class-properties'],
  });

  return {
    files: ['src/**/*.js?(x)', 'src/**/*.snap', '!src/__tests__/**/*.js?(x)'],
    tests: ['src/__tests__/**/*.js?(x)'],
    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: `NODE_PATH=src`,
      },
    },
    compilers: {
      '**/*.js?(x)': babelCompiler,
    },
    setup: wallaby => {
      wallaby.testFramework.configure({
        // as in node_modules/react-scripts/utils/createJestConfig.js
        moduleNameMapper: {
          '^.+\\.(jpg|jpeg|png|gif|svg)$': require.resolve(
            'react-scripts/config/jest/fileTransform.js'
          ),
          '^.+\\.(scss|css)$': require.resolve(
            'react-scripts/config/jest/cssTransform.js'
          ),
        },
        moduleDirectories: ['node_modules', 'src'],
      });
    },
    testFramework: 'jest',
    debug: true,
  };
};
