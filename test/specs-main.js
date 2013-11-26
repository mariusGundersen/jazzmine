
jazzmine.requireConfig({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    "Mocks": "Specs/Mocks",
    "Given": "Specs/Given",
  }
});


jazzmine.onReady(window.__karma__.start);