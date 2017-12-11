
process.env.BABEL_ENV = 'test'
// const babelConfig = require('./.babelrc')
module.exports = function(wallaby) {
  const jestConfig = require('./jest.json')
  process.env.BABEL_ENV = 'test'
  // const babel = Object.assign({}, {
  //   babel: require('@babel/core'),
  // }, babelConfig)
  return {
    files: [
      'packages/**/src/**/*.js',
      '!packages/**/src/**/__tests__/*.js',
    ],

    tests: [
      'packages/**/src/**/__tests__/*.js',
    ],

    env: {
      type:   'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
    delays: {
      run: 2500,
    },

    testFramework: 'jest',

    debug: true,
    setup(wallaby) {
      wallaby.testFramework.configure({
        'automock':          false,
        'collectCoverage':   true,
        'coverageDirectory': '<rootDir>/coverage',
        'coverageReporters': [
          'text', 'html'
        ],
        'transform': {
          '^.+\\.jsx?$': 'babel-jest'
        },
        'projects': [
          '<rootDir>/packages/reader',
          '<rootDir>/packages/maybe'
        ],
        'testEnvironment': 'node'
      })
    },
  }
}
