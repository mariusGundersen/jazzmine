
jazzmine.requireConfig({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    "Mocks": "test/Mocks",
    "Given": "test/Given",
  }
});


jazzmine.onReady(window.__karma__.start);