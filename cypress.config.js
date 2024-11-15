const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:8080',
    chromeWebSecurity: false,
    pageLoadTimeout: 60000,
    setupNodeEvents(on, config) {
      return config;
    },
    experimentalRunAllSpecs: true,
  },
  env: {},
  video: false,
  retries: 2,
});
