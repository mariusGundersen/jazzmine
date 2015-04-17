module.exports = function(config){
  config.set({

    frameworks: [
      'jasmine'
    ],

    files: [
      'node_modules/requirejs/require.js',
      'bin/jazzmine.min.js',
      'node_modules/karma-requirejs/lib/adapter.js',

      'test/specs-main.js',
      {pattern: 'source/**/*.js', included: false},
      {pattern: 'test/Mocks/**/*.js', included: false},
      {pattern: 'test/Matchers/**/*.js', included: false},
      {pattern: 'test/Given/**/*.js', included: false},
      'test/Modules/**/*.js'
    ],

    exclude: [

    ],

    reporters: ['dots'],

    autoWatch: true

  });
};