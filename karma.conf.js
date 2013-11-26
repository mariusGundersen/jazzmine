module.exports = function(config){
  config.set({

    frameworks: [
      'jasmine'
    ],

    files: [
      'bin/jazzmine.min.js',
      'node_modules/requirejs/require.js',
      'node_modules/karma-requirejs/lib/adapter.js',

      'test/specs-main.js',
      {pattern: 'source/**/*.js', included: false},
      {pattern: 'test/Mocks/**/*.js', included: false},
      {pattern: 'test/Given/**/*.js', included: false},
      'test/Modules/**/*.js'
    ],

    exclude: [

    ],

    reporters: ['dots'],

    autoWatch: true

  });
};