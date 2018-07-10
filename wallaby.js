module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts',
      'src/**/*.snap',
      '!src/**/*test.ts'
    ],
    tests: [
      'src/**/*test.ts'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.ts': wallaby.compilers.babel()
    },

    debug: true,

    reportConsoleErrorAsError: true
  }
}
